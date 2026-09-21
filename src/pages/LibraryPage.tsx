import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import PageHeader from '../components/PageHeader'
import PdfIcon from '../components/PdfIcon'
import { useLibraryStore } from '../stores/useLibraryStore'
import styles from './LibraryPage.module.css'

const COMING_SOON = [
  { label: 'Word', ext: 'DOCX', color: '#2b579a' },
  { label: 'Excel', ext: 'XLSX', color: '#1d6f42' },
  { label: 'PowerPoint', ext: 'PPTX', color: '#c43e1c' },
  { label: 'Images', ext: 'PNG · JPG', color: '#7e57c2' },
]

/** Library home: pick a file format. Only PDF is built; the others are placeholders. */
export default function LibraryPage() {
  const navigate = useNavigate()
  const count = useLibraryStore((s) => s.books.length)
  const fetchBooks = useLibraryStore((s) => s.fetchBooks)

  useEffect(() => {
    void fetchBooks()
  }, [fetchBooks])

  return (
    <>
      <Breadcrumb current="Library" />
      <div className={styles.page}>
        <PageHeader title="Library" description="Read and organise your documents. Choose a file format to open its library." />

        <button type="button" className={styles.pdfTile} onClick={() => navigate('/library/pdf')}>
          <span className={styles.pdfIcon}>
            <PdfIcon size={96} />
          </span>
          <span className={styles.pdfText}>
            <span className={styles.pdfTitle}>PDF Documents</span>
            <span className={styles.pdfMeta}>
              {count === 0 ? 'Add your first book' : `${count} ${count === 1 ? 'book' : 'books'} in your library`}
            </span>
            <span className={styles.pdfHint}>Open library →</span>
          </span>
        </button>

        <h2 className={styles.soonHeading}>More formats</h2>
        <div className={styles.soonGrid}>
          {COMING_SOON.map((f) => (
            <div key={f.label} className={styles.soonTile} aria-disabled="true">
              <span className={styles.soonBadge} style={{ background: f.color }}>
                {f.ext}
              </span>
              <span className={styles.soonLabel}>{f.label}</span>
              <span className={styles.soonNote}>Coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
