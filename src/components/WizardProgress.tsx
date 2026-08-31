import styles from './WizardProgress.module.css'

interface WizardProgressProps {
  step: number
  total: number
}

/**
 * Primitive — presentational only. `step` is a static prop (1-indexed),
 * not internal state; real step navigation is wiring-phase work. Steps
 * before `step` render as done, `step` itself as active, the rest neutral.
 * Source: .wizard-progress / .wizard-dot / .wizard-line.
 */
export default function WizardProgress({ step, total }: WizardProgressProps) {
  const dots = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className={styles.progress} aria-hidden="true">
      {dots.map((dot, i) => (
        <div key={dot} style={{ display: 'contents' }}>
          <div className={[styles.dot, dot < step ? styles.dotDone : dot === step ? styles.dotActive : ''].filter(Boolean).join(' ')}>
            {dot}
          </div>
          {i < dots.length - 1 && <div className={[styles.line, dot < step ? styles.lineDone : ''].filter(Boolean).join(' ')} />}
        </div>
      ))}
    </div>
  )
}
