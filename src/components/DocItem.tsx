import type { ReactNode } from 'react'
import styles from './DocItem.module.css'

type DocIconType = 'pdf' | 'docx' | 'xlsx' | 'png'

interface DocItemProps {
  type: DocIconType
  name: string
  meta: string
}

const ICON_CLASS: Record<DocIconType, string | undefined> = {
  pdf: styles.iconPdf,
  docx: styles.iconDocx,
  xlsx: styles.iconXlsx,
  png: styles.iconPng,
}
const ICON_LABEL: Record<DocIconType, string> = {
  pdf: 'PDF',
  docx: 'DOC',
  xlsx: 'XLS',
  png: 'PNG',
}

/** Primitive — one uploaded document row. Download/Delete buttons render but do nothing (no upload/delete logic — static seed data, matching the source's default 4 documents). Source: .doc-item. */
export function DocItem({ type, name, meta }: DocItemProps) {
  return (
    <div className={styles.item}>
      <div className={[styles.icon, ICON_CLASS[type]].filter(Boolean).join(' ')}>{ICON_LABEL[type]}</div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.meta}>{meta}</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.action} type="button" title="Download">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
        <button className={[styles.action, styles.actionDelete].join(' ')} type="button" title="Delete">
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
