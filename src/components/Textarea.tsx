import type { TextareaHTMLAttributes } from 'react'
import styles from './Textarea.module.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
}

/** Primitive — labeled multi-line text field. Source: .form-textarea. */
export default function Textarea({ id, label, className, ...rest }: TextareaProps) {
  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea id={id} className={[styles.textarea, className].filter(Boolean).join(' ')} {...rest} />
    </div>
  )
}
