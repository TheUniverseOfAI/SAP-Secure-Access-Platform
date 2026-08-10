import styles from './Toggle.module.css'

interface ToggleProps {
  id: string
  label: string
  defaultChecked: boolean
  disabled?: boolean
}

/**
 * Primitive — visual toggle switch. Uses `defaultChecked` (uncontrolled)
 * rather than `checked`+`onChange`, since there's no real state to persist
 * yet — this just reflects each auth method's static default from the
 * source data. Clicking flips the visual switch locally (native checkbox
 * behavior) but nothing is saved; real settings persistence is
 * wiring-phase work. `disabled` is used for "mandatory" methods that
 * can't be turned off (source: .toggle input:disabled).
 * Source: .toggle / .toggle-track / .toggle-thumb / .toggle-label.
 */
export default function Toggle({ id, label, defaultChecked, disabled }: ToggleProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.toggle} htmlFor={id}>
        <span className="sr-only">{label}</span>
        <input id={id} type="checkbox" role="switch" defaultChecked={defaultChecked} disabled={disabled} />
        <div className={styles.track} />
        <div className={styles.thumb} />
      </label>
      <span className={[styles.label, defaultChecked ? styles.labelOn : styles.labelOff].join(' ')} aria-hidden="true">
        {defaultChecked ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  )
}
