import type { ReactNode } from 'react'
import type { DocType } from '../data/documents'
import styles from './DocItem.module.css'

interface DocItemProps {
  type: DocType
  label: string
  name: string
  meta: string
  /** An object URL for a real, in-memory file (see DocumentsPage.tsx) — enables a real Download link instead of the inert placeholder button. */
  fileUrl?: string
  /** Provided only for a real PDF (fileUrl + type === 'pdf') — opens the PDF viewer page. */
  onView?: () => void
  onDelete?: () => void
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
 * Primitive — one uploaded document row. Delete is wired to real removal
 * via useDocumentsStore (see DocumentsPage.tsx). Download is a real link
 * (real bytes, via the object URL DocumentsPage creates on upload) only
 * for a document the user actually uploaded; the 4 seed documents have no
 * fileUrl and no real content behind them at all, so their Download stays
 * the honest inert placeholder it always was — same "no fabricated
 * destination" reasoning already used for PortalCard's Launch link and
 * NewsCard. A real PDF additionally gets a View button opening
 * the PDF viewer page. Source: .doc-item.
 */
export function DocItem({ type, label, name, meta, fileUrl, onView, onDelete }: DocItemProps) {
  return (
    <div className={styles.item}>
      <div className={[styles.icon, ICON_CLASS[type]].filter(Boolean).join(' ')}>{label}</div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.meta}>{meta}</div>
      </div>
      <div className={styles.actions}>
        {onView && (
          <button className={styles.action} type="button" title="View" aria-label={`View ${name}`} onClick={onView}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        )}
        {fileUrl ? (
          <a className={styles.action} href={fileUrl} download={name} title="Download" aria-label={`Download ${name}`}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </a>
        ) : (
          <button className={styles.action} type="button" title="Download (no real file behind this mock document)">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
        )}
        <button className={[styles.action, styles.actionDelete].join(' ')} type="button" title="Delete" onClick={onDelete}>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/** Layout wrapper for a list of DocItems. Source: .doc-list. */
export function DocList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}
