import { useRef, useState } from 'react'
import styles from './OtpInputGroup.module.css'

interface OtpInputGroupProps {
  label: string
  length?: number
}

/**
 * 6-digit code entry. Auto-advances focus on digit entry and moves back on
 * backspace — this is local input UX, not the "no wiring" business logic
 * the UI-first rule defers (no actual code is verified against anything).
 * Source: .otp-inputs / .otp-input.
 */
export default function OtpInputGroup({ label, length = 6 }: OtpInputGroupProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    setValues((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className={styles.group} role="group" aria-label={label}>
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoComplete="one-time-code"
          aria-label={`Digit ${i + 1} of ${length}`}
          className={[styles.input, value ? styles.inputFilled : ''].filter(Boolean).join(' ')}
          value={value}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  )
}
