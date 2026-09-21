import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Document, Page, Thumbnail, type DocumentProps } from 'react-pdf'
import { useNavigate } from 'react-router-dom'
import { updateBook } from '../api/libraryApi'
import type { Bookmark, LibraryBook } from '../data/library'
import '../utils/pdfjs'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import styles from './PdfViewer.module.css'

type PdfProxy = Parameters<NonNullable<DocumentProps['onLoadSuccess']>>[0]

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25
const THUMB_WIDTH = 120
const DEFAULT_RATIO = 1.414 // A4 height / width, until a real page reports its size
const PAGE_GAP = 12
const CANVAS_PADDING = 24

const ICON = {
  menu: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
  back: 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18',
  minus: 'M5 12h14',
  plus: 'M12 4.5v15m7.5-7.5h-15',
  fit: 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
  download: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
  print:
    'M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z',
  search: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  rotate:
    'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
  fullscreen: 'M4.5 4.5h6M4.5 4.5v6M19.5 4.5h-6m6 0v6M4.5 19.5h6m-6 0v-6m15 6h-6m6 0v-6',
  up: 'M4.5 15.75l7.5-7.5 7.5 7.5',
  down: 'M19.5 8.25l-7.5 7.5-7.5-7.5',
  close: 'M6 18L18 6M6 6l12 12',
  fitPage: 'M3.75 3.75h16.5v16.5H3.75z M8 9h8M8 12h8M8 15h5',
  bookmark:
    'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z',
  theme:
    'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
}

type ReadingMode = 'light' | 'sepia' | 'dark'
const READING_MODES: ReadingMode[] = ['light', 'sepia', 'dark']

interface OutlineItem {
  title: string
  dest: string | unknown[] | null
  items: OutlineItem[]
}
export interface Chapter {
  title: string
  page: number | null
  children: Chapter[]
}

/** Reads the PDF's built-in outline (its bookmarks / table of contents) and resolves each entry to a page number. Empty if the file has none. */
async function loadChapters(pdf: PdfProxy): Promise<Chapter[]> {
  const outline = (await pdf.getOutline()) as OutlineItem[] | null
  if (!outline) return []
  const resolve = (items: OutlineItem[]): Promise<Chapter[]> =>
    Promise.all(
      items.map(async (item) => {
        let page: number | null = null
        try {
          const dest = typeof item.dest === 'string' ? await pdf.getDestination(item.dest) : item.dest
          const target = Array.isArray(dest) ? dest[0] : null
          if (typeof target === 'number') page = target + 1
          else if (target && typeof target === 'object')
            page = (await pdf.getPageIndex(target as Parameters<PdfProxy['getPageIndex']>[0])) + 1
        } catch {
          page = null
        }
        return { title: item.title, page, children: await resolve(item.items ?? []) }
      }),
    )
  return resolve(outline)
}

const flattenChapters = (chapters: Chapter[]): Chapter[] => chapters.flatMap((c) => [c, ...flattenChapters(c.children)])

function Icon({ path }: { path: string }) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  )
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Wraps every occurrence of `query` in a text-layer item in <mark>, for the search highlight. */
function highlight(str: string, query: string) {
  if (!query) return escapeHtml(str)
  return str
    .split(new RegExp(`(${escapeRegExp(query)})`, 'gi'))
    .map((part, i) => (i % 2 === 1 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
    .join('')
}

/** True once the element is within `margin` px of the viewport of its scroll container — lets a long PDF render only the pages you can actually see. */
function useNearViewport(margin: string) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setNear(entry!.isIntersecting), { rootMargin: margin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [margin])

  return [ref, near] as const
}

function PageSlot({
  pageNumber,
  width,
  ratio,
  rotate,
  query,
  onRatio,
}: {
  pageNumber: number
  width: number
  /** Height / width of the page as displayed (already accounts for rotation). */
  ratio: number
  rotate: number
  query: string
  onRatio: (page: number, ratio: number) => void
}) {
  const [ref, near] = useNearViewport('800px 0px')
  return (
    <div ref={ref} data-page={pageNumber} className={styles.pageSlot} style={{ width, height: Math.round(width * ratio) }}>
      {near && (
        <Page
          pageNumber={pageNumber}
          width={width}
          rotate={rotate}
          loading={null}
          customTextRenderer={query ? ({ str }) => highlight(str, query) : undefined}
          onLoadSuccess={(page) => onRatio(pageNumber, page.originalHeight / page.originalWidth)}
        />
      )}
    </div>
  )
}

function ThumbSlot({
  pageNumber,
  ratio,
  rotate,
  active,
  onSelect,
}: {
  pageNumber: number
  ratio: number
  rotate: number
  active: boolean
  onSelect: (page: number) => void
}) {
  const [ref, near] = useNearViewport('400px 0px')
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (active) buttonRef.current?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <button
      ref={buttonRef}
      type="button"
      className={[styles.thumb, active ? styles.thumbActive : ''].filter(Boolean).join(' ')}
      onClick={() => onSelect(pageNumber)}
      aria-label={`Go to page ${pageNumber}`}
      aria-current={active ? 'page' : undefined}
    >
      <div ref={ref} className={styles.thumbImage} style={{ width: THUMB_WIDTH, height: Math.round(THUMB_WIDTH * ratio) }}>
        {near && <Thumbnail pageNumber={pageNumber} width={THUMB_WIDTH} rotate={rotate} loading={null} />}
      </div>
      <span className={styles.thumbLabel}>{pageNumber}</span>
    </button>
  )
}

function ChapterTree({
  chapters,
  active,
  onSelect,
  depth,
}: {
  chapters: Chapter[]
  active: Chapter | undefined
  onSelect: (page: number) => void
  depth: number
}) {
  return (
    <ul className={styles.chapterList}>
      {chapters.map((c, i) => (
        <li key={`${c.title}-${i}`}>
          <button
            type="button"
            className={[styles.chapter, c === active ? styles.chapterActive : ''].filter(Boolean).join(' ')}
            style={{ paddingLeft: 12 + depth * 14 }}
            disabled={c.page === null}
            onClick={() => c.page !== null && onSelect(c.page)}
            aria-current={c === active ? 'true' : undefined}
          >
            <span className={styles.chapterTitle}>{c.title}</span>
            {c.page !== null && <span className={styles.chapterPage}>{c.page}</span>}
          </button>
          {c.children.length > 0 && <ChapterTree chapters={c.children} active={active} onSelect={onSelect} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

interface PdfViewerProps {
  fileUrl: string
  name: string
  /** A library book: enables resume and bookmarks, saved through libraryApi. */
  book?: LibraryBook
  /** Where Close goes if the browser won't let the tab close itself. */
  fallbackPath?: string
  /** Shown inside the page instead of full screen; Close calls onClose rather than closing the tab. */
  embedded?: boolean
  onClose?: () => void
}

/** Shown when there is no file to open (e.g. the tab that uploaded it was closed). */
export function PdfViewerMissing({ fallbackPath, message }: { fallbackPath: string; message?: string }) {
  const navigate = useNavigate()
  return (
    <div className={styles.missing}>
      <p>{message ?? "This document isn't available to view. Files you upload only exist until the tab you uploaded them in is closed."}</p>
      <button type="button" className={styles.missingBtn} onClick={() => navigate(fallbackPath)}>
        Go back
      </button>
    </div>
  )
}

/**
 * Full-screen PDF viewer, opened in its own browser tab. All pages are stacked in one scrolling column, with a
 * toolbar (page box, zoom, fit width, rotate, search, fullscreen, download,
 * print, close) and a thumbnail sidebar. Only pages near the viewport are
 * actually rendered. Text can be selected and copied (pdf.js text layer), and
 * search highlights every match and steps through them.
 *
 * Given a library `book` it also remembers where you were (page, zoom,
 * rotation) and keeps your bookmarks; without one (a file from the Documents
 * tab) it is a plain viewer. Chapters are read from the PDF's built-in outline
 * when it has one.
 */
export default function PdfViewer({ fileUrl, name, book, fallbackPath = '/profile/documents', embedded = false, onClose }: PdfViewerProps) {
  const navigate = useNavigate()
  const doc = { fileUrl, name }
  const rootRef = useRef<HTMLDivElement>(null)

  const [numPages, setNumPages] = useState(0)
  const [zoom, setZoom] = useState(book?.zoom ?? 1)
  const [rotation, setRotation] = useState(book?.rotation ?? 0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState('1')
  const [thumbsOpen, setThumbsOpen] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [ratios, setRatios] = useState<Record<number, number>>({})
  const [containerWidth, setContainerWidth] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [matchPages, setMatchPages] = useState<number[]>([])
  const [matchIndex, setMatchIndex] = useState(0)
  const [searching, setSearching] = useState(false)

  const [tab, setTab] = useState<'pages' | 'chapters' | 'bookmarks'>('pages')
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(book?.bookmarks ?? [])
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => {
    const saved = localStorage.getItem('sap.pdf.readingMode')
    return READING_MODES.includes(saved as ReadingMode) ? (saved as ReadingMode) : 'light'
  })
  // A library book restores its saved position once, after the pages have laid out; a plain file has nothing to restore.
  const restored = useRef(!book)

  const pdfRef = useRef<PdfProxy | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const resizeObserver = useRef<ResizeObserver | null>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const inputFocused = useRef(false)

  // Opened in its own tab: close that tab (works for a tab a script opened); if the browser refuses, go back to Documents.
  const close = useCallback(() => {
    if (onClose) {
      onClose()
      return
    }
    window.close()
    window.setTimeout(() => navigate(fallbackPath), 150)
  }, [navigate, fallbackPath, onClose])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    setQuery('')
    setSearchQuery('')
    setMatchPages([])
  }, [])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        setSearchOpen(true)
        window.setTimeout(() => searchInputRef.current?.focus(), 0)
      } else if (e.key === 'Escape') {
        if (searchOpen) closeSearch()
        else if (!inputFocused.current) close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close, closeSearch, searchOpen])

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void (embedded ? rootRef.current : document.documentElement)?.requestFullscreen()
  }

  // The scroller only exists once the PDF has loaded, so measure it via a callback ref rather than on mount.
  const setScroller = useCallback((el: HTMLDivElement | null) => {
    resizeObserver.current?.disconnect()
    scrollRef.current = el
    if (!el) return
    const measure = () => setContainerWidth(el.clientWidth)
    measure()
    resizeObserver.current = new ResizeObserver(measure)
    resizeObserver.current.observe(el)
  }, [])

  const baseWidth = Math.max(containerWidth - CANVAS_PADDING * 2, 200)
  const pageWidth = Math.round(baseWidth * zoom)
  const sideways = rotation % 180 !== 0
  const displayRatio = (page: number) => {
    const ratio = ratios[page] ?? ratios[1] ?? DEFAULT_RATIO
    return sideways ? 1 / ratio : ratio
  }

  const onRatio = useCallback((page: number, ratio: number) => {
    setRatios((prev) => (Math.abs((prev[page] ?? 0) - ratio) < 0.001 ? prev : { ...prev, [page]: ratio }))
  }, [])

  const scrollToPage = useCallback((page: number) => {
    const slot = innerRef.current?.querySelector<HTMLElement>(`[data-page="${page}"]`)
    const scroller = scrollRef.current
    if (slot && scroller) scroller.scrollTo({ top: slot.offsetTop - CANVAS_PADDING / 2 })
  }, [])

  // Which page is "current": the last one whose top has passed the upper third of the viewport.
  const updateCurrentPage = useCallback(() => {
    const scroller = scrollRef.current
    const slots = innerRef.current?.querySelectorAll<HTMLElement>('[data-page]')
    if (!scroller || !slots) return
    const marker = scroller.scrollTop + scroller.clientHeight / 3
    let page = 1
    slots.forEach((slot) => {
      if (slot.offsetTop <= marker) page = Number(slot.dataset.page)
    })
    setCurrentPage(page)
  }, [])

  const scrollFrame = useRef(0)
  const onScroll = () => {
    cancelAnimationFrame(scrollFrame.current)
    scrollFrame.current = requestAnimationFrame(updateCurrentPage)
  }

  useEffect(() => {
    if (!inputFocused.current) setPageInput(String(currentPage))
  }, [currentPage])

  // Zooming or rotating changes every page's height — keep the page you were reading in view.
  const pageBeforeResize = useRef(1)
  useEffect(() => {
    scrollToPage(pageBeforeResize.current)
  }, [zoom, rotation, scrollToPage])

  const changeZoom = (next: number) => {
    pageBeforeResize.current = currentPage
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(next * 100) / 100)))
  }

  const rotate = () => {
    pageBeforeResize.current = currentPage
    setRotation((r) => (r + 90) % 360)
  }

  // Search: wait for a pause in typing, then count matches on every page's text.
  useEffect(() => {
    const handle = window.setTimeout(() => setSearchQuery(query.trim()), 250)
    return () => window.clearTimeout(handle)
  }, [query])

  useEffect(() => {
    const pdf = pdfRef.current
    if (!pdf || !searchQuery) {
      setMatchPages([])
      setMatchIndex(0)
      return
    }
    let cancelled = false
    setSearching(true)
    ;(async () => {
      const needle = searchQuery.toLowerCase()
      const found: number[] = []
      for (let p = 1; p <= pdf.numPages; p++) {
        const content = await (await pdf.getPage(p)).getTextContent()
        for (const item of content.items) {
          if (!('str' in item)) continue
          const count = item.str.toLowerCase().split(needle).length - 1
          for (let i = 0; i < count; i++) found.push(p)
        }
        if (cancelled) return
      }
      setMatchPages(found)
      setMatchIndex(0)
      setSearching(false)
      if (found[0]) scrollToPage(found[0])
    })()
    return () => {
      cancelled = true
      setSearching(false)
    }
  }, [searchQuery, scrollToPage])

  const stepMatch = (direction: 1 | -1) => {
    if (matchPages.length === 0) return
    const next = (matchIndex + direction + matchPages.length) % matchPages.length
    setMatchIndex(next)
    scrollToPage(matchPages[next]!)
  }

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      stepMatch(e.shiftKey ? -1 : 1)
    }
  }

  const goToInputPage = () => {
    const n = Math.min(numPages, Math.max(1, parseInt(pageInput, 10) || currentPage))
    setPageInput(String(n))
    scrollToPage(n)
  }

  const onPageInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToInputPage()
      e.currentTarget.blur()
    }
  }

  const print = () => {
    if (!doc?.fileUrl) return
    const frame = document.createElement('iframe')
    frame.style.display = 'none'
    frame.src = doc.fileUrl
    frame.onload = () => frame.contentWindow?.print()
    document.body.appendChild(frame)
    window.setTimeout(() => frame.remove(), 60_000)
  }

  // Resume: once the pages have laid out, jump back to where this book was left.
  useEffect(() => {
    if (!book || restored.current || numPages === 0 || containerWidth === 0) return
    pageBeforeResize.current = book.lastPage
    scrollToPage(book.lastPage)
    const done = window.setTimeout(() => {
      restored.current = true
    }, 400)
    return () => window.clearTimeout(done)
  }, [book, numPages, containerWidth, scrollToPage])

  // Save the reading position shortly after it stops changing (never before the restore has finished).
  useEffect(() => {
    if (!book || !restored.current) return
    const handle = window.setTimeout(() => void updateBook(book.id, { lastPage: currentPage, zoom, rotation }), 600)
    return () => window.clearTimeout(handle)
  }, [book, currentPage, zoom, rotation])

  const saveBookmarks = (next: Bookmark[]) => {
    setBookmarks(next)
    if (book) void updateBook(book.id, { bookmarks: next })
  }
  const bookmarkHere = bookmarks.find((b) => b.page === currentPage)
  const toggleBookmark = () => {
    if (bookmarkHere) saveBookmarks(bookmarks.filter((b) => b.id !== bookmarkHere.id))
    else {
      const added: Bookmark = { id: crypto.randomUUID(), page: currentPage, note: '', createdAt: Date.now() }
      saveBookmarks([...bookmarks, added].sort((a, b) => a.page - b.page))
      setThumbsOpen(true)
      setTab('bookmarks')
    }
  }

  const fitPage = () => {
    const scroller = scrollRef.current
    if (scroller) changeZoom((scroller.clientHeight - CANVAS_PADDING) / (baseWidth * displayRatio(currentPage)))
  }

  const cycleReadingMode = () => {
    const next = READING_MODES[(READING_MODES.indexOf(readingMode) + 1) % READING_MODES.length]!
    setReadingMode(next)
    localStorage.setItem('sap.pdf.readingMode', next)
  }

  // Which chapter you are in: the last one that starts on or before the current page.
  const chapterList = flattenChapters(chapters).filter((c) => c.page !== null)
  const activeChapter = [...chapterList].reverse().find((c) => c.page! <= currentPage)

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === '+' || e.key === '=') changeZoom(zoom + ZOOM_STEP)
      else if (e.key === '-') changeZoom(zoom - ZOOM_STEP)
      else if (e.key === '0') changeZoom(1)
      else if (e.key.toLowerCase() === 'b' && book) toggleBookmark()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const btn = (label: string, path: string, onClick: () => void, extra?: { on?: boolean; disabled?: boolean }) => (
    <button
      type="button"
      className={[styles.iconBtn, extra?.on ? styles.iconBtnOn : ''].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={extra?.disabled}
      aria-label={label}
      aria-pressed={extra?.on}
      title={label}
    >
      <Icon path={path} />
    </button>
  )

  return (
    <div ref={rootRef} className={[styles.viewer, embedded ? styles.embedded : ''].filter(Boolean).join(' ')}>
      <header className={styles.toolbar} role="toolbar" aria-label="PDF viewer controls">
        {btn('Close viewer', ICON.back, close)}
        {btn('Toggle page thumbnails', ICON.menu, () => setThumbsOpen((o) => !o), { on: thumbsOpen })}
        <span className={styles.fileName} title={doc.name}>
          {doc.name}
        </span>

        <div className={styles.group}>
          <input
            className={styles.pageInput}
            value={pageInput}
            inputMode="numeric"
            aria-label="Page number"
            onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ''))}
            onFocus={(e) => {
              inputFocused.current = true
              e.currentTarget.select()
            }}
            onBlur={() => {
              inputFocused.current = false
              setPageInput(String(currentPage))
            }}
            onKeyDown={onPageInputKey}
          />
          <span className={styles.pageTotal}>/ {numPages || '—'}</span>
        </div>

        <div className={styles.group}>
          {btn('Zoom out', ICON.minus, () => changeZoom(zoom - ZOOM_STEP), { disabled: zoom <= MIN_ZOOM })}
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          {btn('Zoom in', ICON.plus, () => changeZoom(zoom + ZOOM_STEP), { disabled: zoom >= MAX_ZOOM })}
          {btn('Fit to width', ICON.fit, () => changeZoom(1))}
          {btn('Fit page', ICON.fitPage, fitPage)}
          {btn('Rotate', ICON.rotate, rotate)}
        </div>

        <div className={styles.group}>
          {book &&
            btn(bookmarkHere ? 'Remove bookmark from this page' : 'Bookmark this page', ICON.bookmark, toggleBookmark, {
              on: Boolean(bookmarkHere),
            })}
          {btn(`Reading mode: ${readingMode}`, ICON.theme, cycleReadingMode, { on: readingMode !== 'light' })}
          {btn(
            'Search',
            ICON.search,
            () => (searchOpen ? closeSearch() : (setSearchOpen(true), window.setTimeout(() => searchInputRef.current?.focus(), 0))),
            {
              on: searchOpen,
            },
          )}
          {btn(isFullscreen ? 'Exit full screen' : 'Full screen', ICON.fullscreen, toggleFullscreen, { on: isFullscreen })}
          <a className={styles.iconBtn} href={doc.fileUrl} download={doc.name} aria-label="Download" title="Download">
            <Icon path={ICON.download} />
          </a>
          {btn('Print', ICON.print, print)}
        </div>
      </header>

      {searchOpen && (
        <div className={styles.searchBar} role="search">
          <input
            ref={searchInputRef}
            className={styles.searchInput}
            value={query}
            placeholder="Find in document"
            aria-label="Find in document"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSearchKey}
          />
          <span className={styles.searchCount} aria-live="polite">
            {searching ? 'Searching…' : searchQuery ? (matchPages.length ? `${matchIndex + 1} of ${matchPages.length}` : 'No results') : ''}
          </span>
          {btn('Previous match', ICON.up, () => stepMatch(-1), { disabled: matchPages.length === 0 })}
          {btn('Next match', ICON.down, () => stepMatch(1), { disabled: matchPages.length === 0 })}
          {btn('Close search', ICON.close, closeSearch)}
        </div>
      )}

      <Document
        file={doc.fileUrl}
        className={styles.body}
        onLoadSuccess={(pdf) => {
          pdfRef.current = pdf
          void loadChapters(pdf).then(setChapters)
          setNumPages(pdf.numPages)
        }}
        onLoadError={() => setLoadError(true)}
        loading={<p className={styles.status}>Loading PDF…</p>}
        error={<p className={styles.status}>Couldn&apos;t load this PDF. The file may be corrupted or in an unsupported format.</p>}
      >
        {!loadError && numPages > 0 && (
          <>
            {thumbsOpen && (
              <aside className={styles.sidebarWrap}>
                <div className={styles.tabs} role="tablist" aria-label="Sidebar">
                  {(book ? (['pages', 'chapters', 'bookmarks'] as const) : (['pages', 'chapters'] as const)).map((name) => (
                    <button
                      key={name}
                      type="button"
                      role="tab"
                      aria-selected={tab === name}
                      className={[styles.tab, tab === name ? styles.tabActive : ''].filter(Boolean).join(' ')}
                      onClick={() => setTab(name)}
                    >
                      {name === 'pages'
                        ? 'Pages'
                        : name === 'chapters'
                          ? 'Chapters'
                          : `Bookmarks${bookmarks.length ? ` (${bookmarks.length})` : ''}`}
                    </button>
                  ))}
                </div>

                {tab === 'pages' && (
                  <nav className={styles.sidebar} aria-label="Page thumbnails">
                    {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                      <ThumbSlot
                        key={n}
                        pageNumber={n}
                        ratio={displayRatio(n)}
                        rotate={rotation}
                        active={n === currentPage}
                        onSelect={scrollToPage}
                      />
                    ))}
                  </nav>
                )}

                {tab === 'chapters' && (
                  <nav className={styles.panel} aria-label="Chapters">
                    {chapters.length === 0 ? (
                      <p className={styles.empty}>This PDF has no chapters built in.</p>
                    ) : (
                      <ChapterTree chapters={chapters} active={activeChapter} onSelect={scrollToPage} depth={0} />
                    )}
                  </nav>
                )}

                {tab === 'bookmarks' && (
                  <div className={styles.panel} aria-label="Bookmarks">
                    {bookmarks.length === 0 ? (
                      <p className={styles.empty}>No bookmarks yet. Use the bookmark button (or press B) on any page.</p>
                    ) : (
                      bookmarks.map((b) => (
                        <div
                          key={b.id}
                          className={[styles.bookmark, b.page === currentPage ? styles.bookmarkActive : ''].filter(Boolean).join(' ')}
                        >
                          <button type="button" className={styles.bookmarkGo} onClick={() => scrollToPage(b.page)}>
                            Page {b.page}
                          </button>
                          <input
                            className={styles.noteInput}
                            defaultValue={b.note}
                            placeholder="Add a note"
                            aria-label={`Note for page ${b.page}`}
                            onBlur={(e) => {
                              if (e.target.value !== b.note)
                                saveBookmarks(bookmarks.map((x) => (x.id === b.id ? { ...x, note: e.target.value } : x)))
                            }}
                          />
                          <button
                            type="button"
                            className={styles.bookmarkDel}
                            onClick={() => saveBookmarks(bookmarks.filter((x) => x.id !== b.id))}
                            aria-label={`Remove bookmark on page ${b.page}`}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </aside>
            )}
            <div
              ref={setScroller}
              className={[styles.scroller, readingMode === 'sepia' ? styles.modeSepia : '', readingMode === 'dark' ? styles.modeDark : '']
                .filter(Boolean)
                .join(' ')}
              onScroll={onScroll}
            >
              <div ref={innerRef} className={styles.pages} style={{ gap: PAGE_GAP, padding: CANVAS_PADDING }}>
                {containerWidth > 0 &&
                  Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                    <PageSlot
                      key={n}
                      pageNumber={n}
                      width={pageWidth}
                      ratio={displayRatio(n)}
                      rotate={rotation}
                      query={searchQuery}
                      onRatio={onRatio}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </Document>
    </div>
  )
}
