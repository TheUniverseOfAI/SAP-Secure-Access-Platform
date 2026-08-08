import styles from './InfoTip.module.css'

interface InfoTipProps {
  text: string
}

/** Primitive — hover tooltip icon, shown next to form labels. Source: .info-tip. */
export default function InfoTip({ text }: InfoTipProps) {
  return (
    <span className={styles.tip} data-tip={text}>
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4m0-4h.01" />
      </svg>
      <span className="sr-only">{text}</span>
    </span>
  )
}
