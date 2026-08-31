import { useRef, useState } from 'react'
import styles from './DocDropzone.module.css'

const FILE_TYPES = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'CSV', 'TXT', 'PNG', 'JPG', 'SVG', 'ZIP', 'JSON', 'XML']
const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.png,.jpg,.jpeg,.gif,.svg,.zip,.json,.xml'

interface DocDropzoneProps {
  onFilesSelected: (files: FileList) => void
}

/**
 * File upload drop zone — click-to-browse and drag-and-drop both work for
 * real now, matching the source's own onclick/ondragover/ondrop/handleFiles
 * wiring exactly (sap-user-profile_v2.html lines 788-793, 837-846). Files
 * are read client-side only (name/size/extension) to build a mock
 * DocItem — nothing is actually uploaded anywhere, since there's no
 * backend yet.
 */
export default function DocDropzone({ onFilesSelected }: DocDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  return (
    <div
      className={[styles.zone, dragOver ? styles.dragover : ''].filter(Boolean).join(' ')}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        if (e.dataTransfer.files.length > 0) onFilesSelected(e.dataTransfer.files)
      }}
    >
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
      <h4>Drag &amp; drop files here</h4>
      <p>
        or <span className={styles.browseLink}>browse your computer</span> · Max 25 MB per file
      </p>
      <div className={styles.types}>
        {FILE_TYPES.map((type) => (
          <span className={styles.typeTag} key={type}>
            {type}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) onFilesSelected(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
