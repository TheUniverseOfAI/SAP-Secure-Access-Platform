import { useSearchParams } from 'react-router-dom'
import PdfViewer, { PdfViewerMissing } from '../components/PdfViewer'

/**
 * The Documents tab's viewer, opened in a new tab (/documents/view?src=<blob URL>&name=<file name>).
 * Only a blob: URL from this same site is ever loaded — never an arbitrary address from the query string.
 * The file only exists while the tab that uploaded it is still open.
 */
export default function PdfViewerPage() {
  const [params] = useSearchParams()
  const src = params.get('src') ?? ''
  if (!src.startsWith(`blob:${window.location.origin}/`)) return <PdfViewerMissing fallbackPath="/profile/documents" />
  return <PdfViewer fileUrl={src} name={params.get('name') || 'document.pdf'} fallbackPath="/profile/documents" />
}
