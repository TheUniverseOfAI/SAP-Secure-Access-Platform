import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBookFile } from '../api/libraryApi'
import Breadcrumb from '../components/Breadcrumb'
import PageHeader from '../components/PageHeader'
import LibraryViewerPage from './LibraryViewerPage'
import PdfIcon from '../components/PdfIcon'
import { formatFileSize } from '../data/documents'
import type { LibraryBook } from '../data/library'
import { useLibraryStore } from '../stores/useLibraryStore'
import styles from './PdfLibraryPage.module.css'

type Sort = 'recent' | 'title' | 'progress'

const progressOf = (b: LibraryBook) => (b.pageCount > 1 ? (b.lastPage - 1) / (b.pageCount - 1) : b.lastOpenedAt ? 1 : 0)

const NEW_TAB_KEY = 'sap.library.openInNewTab'

async function downloadBook(book: LibraryBook) {
  const blob = await getBookFile(book.id)
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = book.name
  a.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** The PDF library: upload books, find them, see reading progress, open one in the viewer (new tab). */
export default function PdfLibraryPage() {
  const books = useLibraryStore((s) => s.books)
  const loading = useLibraryStore((s) => s.loading)
  const errors = useLibraryStore((s) => s.errors)
  const fetchBooks = useLibraryStore((s) => s.fetchBooks)
  const addFiles = useLibraryStore((s) => s.addFiles)
  const removeBook = useLibraryStore((s) => s.removeBook)
  const clearErrors = useLibraryStore((s) => s.clearErrors)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('recent')
  const [openId, setOpenId] = useState<string | null>(null)
  const closeInline = useCallback(() => {
    setOpenId(null)
    void fetchBooks()
  }, [fetchBooks])
  const [newTab, setNewTab] = useState(() => localStorage.getItem(NEW_TAB_KEY) !== 'false')
  const openBook = (id: string) => {
    if (newTab) window.open(`${import.meta.env.BASE_URL}library/pdf/${id}/view`, '_blank')
    else setOpenId(id)
  }
  const [dragOver, setDragOver] = useState(false)
  const [adding, setAdding] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void fetchBooks()
    // Reading in another tab changes progress — refresh when coming back to this one.
    const refresh = () => void fetchBooks()
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [fetchBooks])

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setAdding(true)
    await addFiles(Array.from(files))
    setAdding(false)
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = books.filter((b) => !q || b.title.toLowerCase().includes(q))
    if (sort === 'title') return [...list].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'progress') return [...list].sort((a, b) => progressOf(b) - progressOf(a))
    return list
  }, [books, query, sort])

  return (
    <>
      <Breadcrumb current="PDF Library" parent="Library" />
      <div className={styles.page}>
        <PageHeader
          title="PDF Library"
          description="Your books and documents. Reading position and bookmarks are remembered for each one."
        />

        <div
          className={[styles.drop, dragOver ? styles.dropOver : ''].filter(Boolean).join(' ')}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            void handleFiles(e.dataTransfer.files)
          }}
        >
          <PdfIcon size={40} />
          <div className={styles.dropText}>
            <strong>{adding ? 'Adding…' : 'Drop PDF files here'}</strong>
            <span>or choose files from your computer — up to 100 MB each</span>
          </div>
          <button type="button" className={styles.addBtn} onClick={() => inputRef.current?.click()} disabled={adding}>
            Add PDFs
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            hidden
            data-testid="library-file-input"
            onChange={(e) => {
              void handleFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </div>

        {openId && (
          <div className={styles.inlineViewer}>
            <LibraryViewerPage key={openId} bookId={openId} onClose={closeInline} />
          </div>
        )}

        {errors.length > 0 && (
          <div className={styles.errors} role="alert">
            <ul>
              {errors.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <button type="button" onClick={clearErrors} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        {books.length > 0 && (
          <div className={styles.controls}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search your library"
              aria-label="Search your library"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <label className={styles.sort}>
              <input
                type="checkbox"
                checked={newTab}
                onChange={(e) => {
                  setNewTab(e.target.checked)
                  localStorage.setItem(NEW_TAB_KEY, String(e.target.checked))
                }}
              />
              Open in new tab (unticked: read here on this page)
            </label>
            <label className={styles.sort}>
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="recent">Recently opened</option>
                <option value="title">Title</option>
                <option value="progress">Progress</option>
              </select>
            </label>
          </div>
        )}

        {loading ? (
          <p className={styles.status}>Loading your library…</p>
        ) : books.length === 0 ? (
          <p className={styles.status}>
            No books yet. Add a PDF above to start your library. <Link to="/library">Back to Library</Link>
          </p>
        ) : visible.length === 0 ? (
          <p className={styles.status}>No books match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className={styles.grid}>
            {visible.map((book) => {
              const progress = Math.round(progressOf(book) * 100)
              return (
                <article key={book.id} className={styles.card}>
                  <button type="button" className={styles.open} onClick={() => openBook(book.id)} aria-label={`Open ${book.title}`}>
                    <span className={styles.cover}>{book.cover ? <img src={book.cover} alt="" /> : <PdfIcon size={56} />}</span>
                    <span className={styles.title} title={book.title}>
                      {book.title}
                    </span>
                    <span className={styles.meta}>
                      {book.pageCount} pages · {formatFileSize(book.size)}
                      {book.bookmarks.length > 0 && ` · ${book.bookmarks.length} bookmark${book.bookmarks.length === 1 ? '' : 's'}`}
                    </span>
                    <span
                      className={styles.progress}
                      role="progressbar"
                      aria-label="Reading progress"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span style={{ width: `${progress}%` }} />
                    </span>
                    <span className={styles.resume}>{book.lastOpenedAt ? `Resume on page ${book.lastPage}` : 'Not started'}</span>
                  </button>
                  <div className={styles.actions}>
                    <button type="button" onClick={() => void downloadBook(book)} aria-label={`Download ${book.title}`} title="Download">
                      Download
                    </button>
                    <button
                      type="button"
                      className={styles.danger}
                      onClick={() => {
                        if (window.confirm(`Remove "${book.title}" from your library?`)) void removeBook(book.id)
                      }}
                      aria-label={`Remove ${book.title}`}
                      title="Remove"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
