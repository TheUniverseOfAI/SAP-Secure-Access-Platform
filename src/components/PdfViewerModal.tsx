import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Button from './Button'
import FormModal from './FormModal'
import styles from './PdfViewerModal.module.css'

// Vite-native way to get a correct, bundled URL for pdf.js's worker file —
// see https://github.com/wojtekmaj/react-pdf#configure-pdfjs-worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

interface PdfViewerModalProps {
  /** An object URL (URL.createObjectURL) for a real, in-memory file — there is no server to fetch a PDF from. */
  fileUrl: string
  fileName: string
  onClose: () => void
}

/**
 * Renders a real PDF, page by page, via react-pdf (a React wrapper around
 * Mozilla's pdf.js). Only ever opened for a document that has a real
 * fileUrl — i.e. a file the user actually uploaded through DocDropzone —
 * never for the 4 seed documents, which have no real bytes behind them at
 * all (see DocItem.tsx's Download button for why those stay inert).
 *
 * The page is sized to the modal's width, and changing page keeps the
 * previous page on screen until the next one has finished rendering —
 * otherwise each Next/Previous click blanks the viewer for a moment.
 */
export default function PdfViewerModal({ fileUrl, fileName, onClose }: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [renderedPage, setRenderedPage] = useState<number | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [width, setWidth] = useState(0)
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = viewerRef.current
    if (!el) return
    const measure = () => setWidth(Math.floor(el.clientWidth))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const switching = renderedPage !== null && renderedPage !== pageNumber

  return (
    <FormModal
      wide
      titleId="pdfViewerTitle"
      title={fileName}
      icon={
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-3.75 3h7.5a2.25 2.25 0 002.25-2.25V6.31a2.25 2.25 0 00-.659-1.591L14.909 1.409A2.25 2.25 0 0013.318.75H6.75a2.25 2.25 0 00-2.25 2.25v16.5a2.25 2.25 0 002.25 2.25z" />
        </svg>
      }
      onClose={onClose}
      footer={
        numPages ? (
          <div className={styles.pager}>
            <Button variant="outline" size="sm" disabled={pageNumber <= 1} onClick={() => setPageNumber((p) => p - 1)}>
              Previous
            </Button>
            <span className={styles.pageLabel}>
              Page {pageNumber} of {numPages}
            </span>
            <Button variant="outline" size="sm" disabled={pageNumber >= numPages} onClick={() => setPageNumber((p) => p + 1)}>
              Next
            </Button>
          </div>
        ) : null
      }
    >
      <div className={styles.viewer} ref={viewerRef}>
        {loadError ? (
          <p className={styles.status}>Couldn&apos;t load this PDF. The file may be corrupted or in an unsupported format.</p>
        ) : (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() => setLoadError(true)}
            loading={<p className={styles.status}>Loading PDF…</p>}
          >
            {width > 0 && (
              <div className={styles.pages}>
                {switching && renderedPage !== null && (
                  <Page key={`page-${renderedPage}`} pageNumber={renderedPage} width={width} loading={null} />
                )}
                <Page
                  key={`page-${pageNumber}`}
                  pageNumber={pageNumber}
                  width={width}
                  loading={null}
                  className={switching ? styles.pending : undefined}
                  onRenderSuccess={() => setRenderedPage(pageNumber)}
                />
              </div>
            )}
          </Document>
        )}
      </div>
    </FormModal>
  )
}
