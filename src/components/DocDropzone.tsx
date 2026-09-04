import { useRef, useState } from 'react'
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_BYTES, formatFileSize } from '../data/documents'
import styles from './DocDropzone.module.css'

const ACCEPT = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(',')

interface DocDropzoneProps {
  onFilesSelected: (files: FileList) => void
}

/**
 * File upload drop zone — click-to-browse, drag-and-drop, and keyboard
 * (Enter/Space, like any button) all open the same file picker, matching
 * the source's own onclick/ondragover/ondrop/handleFiles wiring
 * (sap-user-profile_v2.html lines 788-793, 837-846) plus the keyboard
 * support the source never had. Validation (extension/size) and the
 * actual upload simulation happen in useFileUpload, not here — this
 * component's only job is turning a click/drop/keypress into a FileList.
 */
export default function DocDropzone({ onFilesSelected }: DocDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  return (
    <div
      className={[styles.zone, dragOver ? styles.dragover : ''].filter(Boolean).join(' ')}
      role="button"
      tabIndex={0}
      aria-label={`Upload documents, ${formatFileSize(MAX_FILE_SIZE_BYTES)} max per file`}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
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
        or <span className={styles.browseLink}>browse your computer</span> · Max {formatFileSize(MAX_FILE_SIZE_BYTES)} per file
      </p>
      <div className={styles.types} aria-hidden="true">
        {ACCEPTED_EXTENSIONS.map((ext) => (
          <span className={styles.typeTag} key={ext}>
            {ext.toUpperCase()}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) onFilesSelected(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
