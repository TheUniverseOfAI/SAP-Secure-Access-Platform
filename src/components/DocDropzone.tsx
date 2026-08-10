import styles from './DocDropzone.module.css'

const FILE_TYPES = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'CSV', 'TXT', 'PNG', 'JPG', 'SVG', 'ZIP', 'JSON', 'XML']

/** Primitive — file upload drop zone. Static/inert: no click-to-browse, drag-drop, or upload logic (visual only). Source: .doc-dropzone. */
export default function DocDropzone() {
  return (
    <div className={styles.zone}>
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
    </div>
  )
}
