import { useEffect } from 'react'
import Card from '../../components/Card'
import DocDropzone from '../../components/DocDropzone'
import { DocItem, DocList } from '../../components/DocItem'
import PageHeader from '../../components/PageHeader'
import { docLabelFromFilename, docTypeFromFilename, formatFileSize } from '../../data/documents'
import { useDocumentsStore } from '../../stores/useDocumentsStore'

/**
 * Real Documents tab — full visual parity with sap-user-profile_v2.html's
 * #tab-documents panel, including its 4 default seed documents. Backed by
 * useDocumentsStore/src/api/documentsApi.ts (same pattern as
 * useAuthSettingsStore): the dropzone's click-to-browse and drag-and-drop
 * both add a real mock entry (name/size/extension read from the actual
 * File object, nothing uploaded anywhere), and Delete really removes it.
 * Download stays inert — see DocItem.tsx for why.
 */
export default function DocumentsPage() {
  const documents = useDocumentsStore((s) => s.documents)
  const loading = useDocumentsStore((s) => s.loading)
  const fetchDocuments = useDocumentsStore((s) => s.fetchDocuments)
  const addDocument = useDocumentsStore((s) => s.addDocument)
  const deleteDocument = useDocumentsStore((s) => s.deleteDocument)

  useEffect(() => {
    if (documents.length === 0 && !loading) fetchDocuments()
  }, [documents.length, loading, fetchDocuments])

  const handleFilesSelected = (files: FileList) => {
    Array.from(files).forEach((file) => {
      addDocument({
        type: docTypeFromFilename(file.name),
        label: docLabelFromFilename(file.name),
        name: file.name,
        meta: `${formatFileSize(file.size)} · Uploaded just now`,
      })
    })
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
        <DocDropzone onFilesSelected={handleFilesSelected} />
        {loading ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading documents…</p>
        ) : (
          <DocList>
            {documents.map((doc) => (
              <DocItem key={doc.id} type={doc.type} label={doc.label} name={doc.name} meta={doc.meta} onDelete={() => deleteDocument(doc.id)} />
            ))}
          </DocList>
        )}
      </Card>
    </>
  )
}
