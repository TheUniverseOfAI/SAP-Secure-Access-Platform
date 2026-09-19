import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useDocumentsStore } from '../stores/useDocumentsStore'
import styles from './PdfViewerPage.module.css'

// Vite-native way to get a correct, bundled URL for pdf.js's worker file —
// see https://github.com/wojtekmaj/react-pdf#configure-pdfjs-worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

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
}

function Icon({ path }: { path: string }) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  )
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
  onRatio,
}: {
  pageNumber: number
  width: number
  ratio: number
  onRatio: (page: number, ratio: number) => void
}) {
  const [ref, near] = useNearViewport('800px 0px')
  return (
    <div ref={ref} data-page={pageNumber} className={styles.pageSlot} style={{ width, height: Math.round(width * ratio) }}>
      {near && (
        <Page
          pageNumber={pageNumber}
          width={width}
          loading={null}
          onLoadSuccess={(page) => onRatio(pageNumber, page.originalHeight / page.originalWidth)}
        />
      )}
    </div>
  )
}

function ThumbSlot({
  pageNumber,
  ratio,
  active,
  onSelect,
}: {
  pageNumber: number
  ratio: number
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
        {near && <Thumbnail pageNumber={pageNumber} width={THUMB_WIDTH} loading={null} />}
      </div>
      <span className={styles.thumbLabel}>{pageNumber}</span>
    </button>
  )
}

/**
 * Full-screen PDF viewer for a document the user uploaded (route
 * /documents/:id/view). All pages are stacked in one scrolling column, with a
 * toolbar (page box, zoom, fit width, download, print, close) and a thumbnail
 * sidebar. Only pages near the viewport are actually rendered.
 *
 * The file is an in-memory object URL from the upload, so a page refresh or
 * a direct link has nothing to show — that case says so instead of failing.
 */
export default function PdfViewerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doc = useDocumentsStore((s) => s.documents.find((d) => d.id === id))

  const [numPages, setNumPages] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState('1')
  const [thumbsOpen, setThumbsOpen] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [ratios, setRatios] = useState<Record<number, number>>({})
  const [containerWidth, setContainerWidth] = useState(0)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const resizeObserver = useRef<ResizeObserver | null>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const inputFocused = useRef(false)

  const close = useCallback(() => navigate('/profile/documents'), [navigate])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && !inputFocused.current) close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

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
  const fallbackRatio = ratios[1] ?? DEFAULT_RATIO

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

  // Zooming changes every page's height — keep the page you were reading in view.
  const pageBeforeZoom = useRef(1)
  useEffect(() => {
    scrollToPage(pageBeforeZoom.current)
  }, [zoom, scrollToPage])

  const changeZoom = (next: number) => {
    pageBeforeZoom.current = currentPage
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(next * 100) / 100)))
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

  if (!doc?.fileUrl) {
    return (
      <div className={styles.missing}>
        <p>This document isn&apos;t available to view. Files you upload only exist until the page is refreshed.</p>
        <button type="button" className={styles.missingBtn} onClick={close}>
          Back to Documents
        </button>
      </div>
    )
  }

  return (
    <div className={styles.viewer}>
      <header className={styles.toolbar} role="toolbar" aria-label="PDF viewer controls">
        <button type="button" className={styles.iconBtn} onClick={close} aria-label="Close viewer" title="Close (Esc)">
          <Icon path={ICON.back} />
        </button>
        <button
          type="button"
          className={[styles.iconBtn, thumbsOpen ? styles.iconBtnOn : ''].filter(Boolean).join(' ')}
          onClick={() => setThumbsOpen((o) => !o)}
          aria-label="Toggle page thumbnails"
          aria-pressed={thumbsOpen}
          title="Thumbnails"
        >
          <Icon path={ICON.menu} />
        </button>
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
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => changeZoom(zoom - ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            title="Zoom out"
          >
            <Icon path={ICON.minus} />
          </button>
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => changeZoom(zoom + ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            title="Zoom in"
          >
            <Icon path={ICON.plus} />
          </button>
          <button type="button" className={styles.iconBtn} onClick={() => changeZoom(1)} aria-label="Fit to width" title="Fit to width">
            <Icon path={ICON.fit} />
          </button>
        </div>

        <div className={styles.group}>
          <a className={styles.iconBtn} href={doc.fileUrl} download={doc.name} aria-label="Download" title="Download">
            <Icon path={ICON.download} />
          </a>
          <button type="button" className={styles.iconBtn} onClick={print} aria-label="Print" title="Print">
            <Icon path={ICON.print} />
          </button>
        </div>
      </header>

      <Document
        file={doc.fileUrl}
        className={styles.body}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={() => setLoadError(true)}
        loading={<p className={styles.status}>Loading PDF…</p>}
        error={<p className={styles.status}>Couldn&apos;t load this PDF. The file may be corrupted or in an unsupported format.</p>}
      >
        {!loadError && numPages > 0 && (
          <>
            {thumbsOpen && (
              <nav className={styles.sidebar} aria-label="Page thumbnails">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                  <ThumbSlot key={n} pageNumber={n} ratio={ratios[n] ?? fallbackRatio} active={n === currentPage} onSelect={scrollToPage} />
                ))}
              </nav>
            )}
            <div ref={setScroller} className={styles.scroller} onScroll={onScroll}>
              <div ref={innerRef} className={styles.pages} style={{ gap: PAGE_GAP, padding: CANVAS_PADDING }}>
                {containerWidth > 0 &&
                  Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                    <PageSlot key={n} pageNumber={n} width={pageWidth} ratio={ratios[n] ?? fallbackRatio} onRatio={onRatio} />
                  ))}
              </div>
            </div>
          </>
        )}
      </Document>
    </div>
  )
}
