import type { AuthMethod } from '../data/authSettings'
import Toggle from './Toggle'
import styles from './AuthMethodCard.module.css'

const TAG_CLASS: Record<AuthMethod['tag'], string | undefined> = {
  mandatory: styles.tagMandatory,
  recommended: styles.tagRecommended,
  optional: styles.tagOptional,
}
const TAG_LABEL: Record<AuthMethod['tag'], string> = {
  mandatory: 'Mandatory',
  recommended: 'Recommended',
  optional: 'Optional',
}

/**
 * Primitive — one authentication method row (icon, name + tag badge,
 * description, toggle). `iconSvg` is rendered via dangerouslySetInnerHTML:
 * this is 100% static, hand-authored SVG path data from our own
 * src/data/authSettings.ts (not user input or any dynamic/external
 * source), so this is a deliberate, scoped exception to avoid manually
 * converting ~23 multi-element icons' worth of svg attributes
 * (stroke-width -> strokeWidth etc.) to JSX by hand. Source: .auth-card
 * and its children in sap-auth-settings_v3.html.
 */
export default function AuthMethodCard({ method }: { method: AuthMethod }) {
  return (
    <div className={[styles.card, method.enabled ? '' : styles.cardDisabled].filter(Boolean).join(' ')}>
      <div className={styles.icon} style={{ background: method.iconBg }} aria-hidden="true">
        <svg
          fill="none"
          stroke={method.iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          dangerouslySetInnerHTML={{ __html: method.iconSvg }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.name} id={`name-${method.id}`}>
          {method.name}
          <span className={[styles.tag, TAG_CLASS[method.tag]].filter(Boolean).join(' ')}>{TAG_LABEL[method.tag]}</span>
        </div>
        <div className={styles.desc}>{method.desc}</div>
      </div>
      <Toggle id={`toggle-${method.id}`} label={method.name} defaultChecked={method.enabled} disabled={method.locked} />
    </div>
  )
}

/** Layout wrapper for a list of AuthMethodCards. Source: .auth-list. */
export function AuthMethodList({ methods }: { methods: AuthMethod[] }) {
  return (
    <div className={styles.list}>
      {methods.map((method) => (
        <AuthMethodCard key={method.id} method={method} />
      ))}
    </div>
  )
}
