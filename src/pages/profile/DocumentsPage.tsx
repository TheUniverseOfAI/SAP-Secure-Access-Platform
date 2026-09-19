import { lazy, Suspense, useEffect, useState } from 'react'
import Card from '../../components/Card'
import DocDropzone from '../../components/DocDropzone'
import { DocItem, DocList } from '../../components/DocItem'
import PageHeader from '../../components/PageHeader'
import UploadQueueItem from '../../components/UploadQueueItem'

// react-pdf/pdfjs-dist adds ~700KB to whatever chunk imports it — lazy-loaded so
// only someone who actually opens a PDF pays that cost, not every page load.
const PdfViewerModal = lazy(() => import('../../components/PdfViewerModal'))
import { docLabelFromFilename, docTypeFromFilename, formatFileSize, type Document } from '../../data/documents'
import { useFileUpload } from '../../hooks/useFileUpload'
import { useDocumentsStore } from '../../stores/useDocumentsStore'

/**
 * Real Documents tab — full visual parity with sap-user-profile_v2.html's
 * #tab-documents panel, including its 4 default seed documents. Backed by
 * useDocumentsStore/src/api/documentsApi.ts (same pattern as
 * useAuthSettingsStore): Delete really removes an entry.
 *
 * Uploads go through useFileUpload rather than adding straight to the
 * store: each dropped/browsed file is validated (extension + 25 MB
 * limit, both real checks now, not just advisory copy) and, if valid,
 * shown with simulated transfer progress before it's committed as a real
 * DocItem — a file rejected by validation shows a real error row instead
 * of silently vanishing or silently succeeding.
 *
 * A freshly-uploaded file keeps a real object URL (URL.createObjectURL) —
 * the browser genuinely has those bytes in memory, so DocItem can offer a
 * real View (PDFs, via PdfViewerModal) or Download action for it. The 4
 * seed documents have no such URL and no real content behind them at all,
 * so their Download stays honestly inert — see DocItem.tsx.
 */
export default function DocumentsPage() {
  const documents = useDocumentsStore((s) => s.documents)
  const loading = useDocumentsStore((s) => s.loading)
  const fetchDocuments = useDocumentsStore((s) => s.fetchDocuments)
  const addDocument = useDocumentsStore((s) => s.addDocument)
  const deleteDocument = useDocumentsStore((s) => s.deleteDocument)
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null)

  const { queue, addFiles, dismiss } = useFileUpload((file) =>
    addDocument({
      type: docTypeFromFilename(file.name),
      label: docLabelFromFilename(file.name),
      name: file.name,
      meta: `${formatFileSize(file.size)} · Uploaded just now`,
      fileUrl: URL.createObjectURL(file),
    }),
  )

  useEffect(() => {
    if (documents.length === 0 && !loading) fetchDocuments()
  }, [documents.length, loading, fetchDocuments])

  const handleDelete = (doc: Document) => {
    if (doc.fileUrl) URL.revokeObjectURL(doc.fileUrl)
    deleteDocument(doc.id)
  }

  return (
    <>
      <PageHeader
        title="Documents"
        description="Upload and manage personal documents. Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, CSV, TXT, RTF, PNG, JPG, GIF, SVG, ZIP, JSON, XML."
      />
      <Card
        title="Upload Files"
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m0 0l3-3m-3 3l3 3" />
          </svg>
        }
      >
        <DocDropzone onFilesSelected={addFiles} />
        {queue.length > 0 && (
          <DocList>
            {queue.map((entry) => (
              <UploadQueueItem
                key={entry.id}
                file={entry.file}
                progress={entry.progress}
                status={entry.status}
                error={entry.error}
                onCancel={() => dismiss(entry.id)}
              />
            ))}
          </DocList>
        )}
        {loading ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading documents…</p>
        ) : (
          <DocList>
            {documents.map((doc) => (
              <DocItem
                key={doc.id}
                type={doc.type}
                label={doc.label}
                name={doc.name}
                meta={doc.meta}
                fileUrl={doc.fileUrl}
                onView={doc.fileUrl && doc.type === 'pdf' ? () => setViewingDoc(doc) : undefined}
                onDelete={() => handleDelete(doc)}
              />
            ))}
          </DocList>
        )}
      </Card>

      {viewingDoc?.fileUrl && (
        <Suspense fallback={<p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading viewer…</p>}>
          <PdfViewerModal fileUrl={viewingDoc.fileUrl} fileName={viewingDoc.name} onClose={() => setViewingDoc(null)} />
        </Suspense>
      )}
    </>
  )
}
