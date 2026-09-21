import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook, getBookFile, updateBook } from '../api/libraryApi'
import PdfViewer, { PdfViewerMissing } from '../components/PdfViewer'
import type { LibraryBook } from '../data/library'

type State = { status: 'loading' } | { status: 'missing' } | { status: 'ready'; book: LibraryBook; url: string }

/**
 * Opens a book from the PDF library (/library/pdf/:id/view) in its own tab.
 * The file comes from the browser's database, so unlike the Documents tab's
 * viewer it works after a refresh, in any tab, at any time.
 */
export default function LibraryViewerPage({ bookId, onClose }: { bookId?: string; onClose?: () => void } = {}) {
  const params = useParams()
  const id = bookId ?? params.id
  const embedded = Boolean(onClose)
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    if (!id) return
    let objectUrl: string | null = null
    let cancelled = false
    ;(async () => {
      const [book, blob] = await Promise.all([getBook(id), getBookFile(id)])
      if (cancelled) return
      if (!book || !blob) {
        setState({ status: 'missing' })
        return
      }
      objectUrl = URL.createObjectURL(blob)
      if (!onClose) document.title = book.title
      void updateBook(id, { lastOpenedAt: Date.now() })
      setState({ status: 'ready', book, url: objectUrl })
    })()
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [id, onClose])

  if (state.status === 'loading') return embedded ? <p>Loading…</p> : null
  if (state.status === 'missing') return <PdfViewerMissing fallbackPath="/library/pdf" message="This book is no longer in your library." />
  return <PdfViewer fileUrl={state.url} name={state.book.name} book={state.book} fallbackPath="/library/pdf" embedded={embedded} onClose={onClose} />
}
