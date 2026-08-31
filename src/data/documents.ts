export type DocType = 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg' | 'txt' | 'csv' | 'pptx'

export interface Document {
  id: string
  /** Drives the icon color. */
  type: DocType
  /** The short label shown in the icon (e.g. "PDF", "DOC", or the real uploaded file's extension, e.g. "GIF") — kept separate from `type` since the source's own seed docs use short fixed labels while uploads show the literal extension. */
  label: string
  name: string
  meta: string
}

/** Source: handleFiles()'s extColors map exactly (sap-user-profile_v2.html) — note gif/svg reuse the png icon, zip reuses txt, json/xml reuse csv, matching the source's own (slightly loose) grouping. */
const EXTENSION_TYPE: Record<string, DocType> = {
  pdf: 'pdf',
  doc: 'docx',
  docx: 'docx',
  xls: 'xlsx',
  xlsx: 'xlsx',
  ppt: 'pptx',
  pptx: 'pptx',
  csv: 'csv',
  txt: 'txt',
  rtf: 'txt',
  png: 'png',
  jpg: 'jpg',
  jpeg: 'jpg',
  gif: 'png',
  svg: 'png',
  zip: 'txt',
  json: 'csv',
  xml: 'csv',
}

export function docTypeFromFilename(filename: string): DocType {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return EXTENSION_TYPE[ext] ?? 'txt'
}

/** Source: handleFiles() labels an upload with its literal extension, uppercased. */
export function docLabelFromFilename(filename: string): string {
  return (filename.split('.').pop() ?? '').toUpperCase()
}

/** Source: handleFiles()'s size formatting exactly — KB under 1MB, MB (1 decimal) above. */
export function formatFileSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** Source: the 4 default seed documents in sap-user-profile_v2.html's #tab-documents panel. */
export const seedDocuments: Document[] = [
  { id: 'doc-1', type: 'pdf', label: 'PDF', name: 'Employment_Contract_2024.pdf', meta: '1.2 MB · Uploaded Mar 15, 2024' },
  { id: 'doc-2', type: 'docx', label: 'DOC', name: 'NDA_Signed_Agreement.docx', meta: '340 KB · Uploaded Mar 16, 2024' },
  { id: 'doc-3', type: 'xlsx', label: 'XLS', name: 'Tax_W4_2024.xlsx', meta: '89 KB · Uploaded Apr 1, 2024' },
  { id: 'doc-4', type: 'png', label: 'PNG', name: 'Passport_Scan_Front.png', meta: '2.4 MB · Uploaded Mar 20, 2024' },
]
