import { docLabelFromFilename, docTypeFromFilename, formatFileSize, type DocType } from '../data/documents'
import styles from './UploadQueueItem.module.css'

interface UploadQueueItemProps {
  file: File
  progress: number
  status: 'uploading' | 'error'
  error?: string
  onCancel: () => void
}

const ICON_CLASS: Record<DocType, string | undefined> = {
  pdf: styles.iconPdf,
  docx: styles.iconDocx,
  xlsx: styles.iconXlsx,
  png: styles.iconPng,
  jpg: styles.iconJpg,
  txt: styles.iconTxt,
  csv: styles.iconCsv,
  pptx: styles.iconPptx,
}

/**
 * One row in the upload queue — a file that's either mid-transfer (progress
 * bar, ticking up via useFileUpload's simulated latency) or rejected by
 * validation (extension/size, shown as a real error state rather than
 * silently dropped). Visually an extension of DocItem's row shape
 * (composes its classes) so a file doesn't visibly jump layout when it
 * finishes uploading and becomes a real DocItem.
 */
export default function UploadQueueItem({ file, progress, status, error, onCancel }: UploadQueueItemProps) {
  const isError = status === 'error'

  return (
    <div className={[styles.item, isError ? styles.itemError : ''].filter(Boolean).join(' ')}>
      <div className={[styles.icon, isError ? styles.iconError : ICON_CLASS[docTypeFromFilename(file.name)]].filter(Boolean).join(' ')}>
        {isError ? (
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        ) : (
          docLabelFromFilename(file.name)
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{file.name}</div>
        {isError ? (
          <div className={styles.errorText} role="alert">
            {error}
          </div>
        ) : (
          <>
            <div className={styles.meta}>{formatFileSize(file.size)} · Uploading…</div>
            <div
              className={styles.track}
              role="progressbar"
              aria-label={`Uploading ${file.name}`}
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className={styles.fill} style={{ width: `${progress}%` }} />
            </div>
          </>
        )}
      </div>
      <button className={styles.cancel} type="button" aria-label={isError ? 'Dismiss' : 'Cancel upload'} onClick={onCancel}>
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
