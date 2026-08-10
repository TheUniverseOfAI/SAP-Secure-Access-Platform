import Card from '../../components/Card'
import DocDropzone from '../../components/DocDropzone'
import { DocItem, DocList } from '../../components/DocItem'
import PageHeader from '../../components/PageHeader'

/**
 * Real Documents tab — full visual parity with sap-user-profile_v2.html's
 * #tab-documents panel, including its 4 default seed documents (unlike
 * Employment History or the Financial lists, this one doesn't start
 * empty in the source). Upload/download/delete are all inert.
 */
export default function DocumentsPage() {
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
        <DocDropzone />
        <DocList>
          <DocItem type="pdf" name="Employment_Contract_2024.pdf" meta="1.2 MB · Uploaded Mar 15, 2024" />
          <DocItem type="docx" name="NDA_Signed_Agreement.docx" meta="340 KB · Uploaded Mar 16, 2024" />
          <DocItem type="xlsx" name="Tax_W4_2024.xlsx" meta="89 KB · Uploaded Apr 1, 2024" />
          <DocItem type="png" name="Passport_Scan_Front.png" meta="2.4 MB · Uploaded Mar 20, 2024" />
        </DocList>
      </Card>
    </>
  )
}
