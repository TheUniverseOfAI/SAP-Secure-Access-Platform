import styles from './Toggle.module.css'

interface ToggleProps {
  id: string
  label: string
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

/**
 * Primitive — visual toggle switch. Controlled (`checked`+`onChange`)
 * now that real state exists to persist — see useAuthSettingsStore.
 * `disabled` is used for "mandatory" methods that can't be turned off
 * (source: .toggle input:disabled).
 * Source: .toggle / .toggle-track / .toggle-thumb / .toggle-label.
 */
export default function Toggle({ id, label, checked, onChange, disabled }: ToggleProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.toggle} htmlFor={id}>
        <span className="sr-only">{label}</span>
        <input id={id} type="checkbox" role="switch" checked={checked} onChange={(e) => onChange?.(e.target.checked)} disabled={disabled} />
        <div className={styles.track} />
        <div className={styles.thumb} />
      </label>
      <span className={[styles.label, checked ? styles.labelOn : styles.labelOff].join(' ')} aria-hidden="true">
        {checked ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  )
}
