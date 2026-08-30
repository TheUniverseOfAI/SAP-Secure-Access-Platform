import type { ReactNode } from 'react'
import { CATEGORY_LABELS, type NewsArticle } from '../data/news'
import styles from './NewsCard.module.css'

const CATEGORY_CLASS: Record<NewsArticle['category'], string | undefined> = {
  tech: styles.tagTech,
  ai: styles.tagAi,
  sports: styles.tagSports,
  cybersecurity: styles.tagCyber,
}

/**
 * One mock news article card. Not clickable — the headlines/sources are
 * invented placeholder content with no real article behind them, so
 * there's nothing real to navigate to (same reasoning PortalCard's inert
 * "Launch" link already uses for destinations this app doesn't own).
 */
export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className={styles.card}>
      <span className={[styles.tag, CATEGORY_CLASS[article.category]].filter(Boolean).join(' ')}>
        {CATEGORY_LABELS[article.category]}
      </span>
      <h4 className={styles.headline}>{article.headline}</h4>
      <p className={styles.summary}>{article.summary}</p>
      <div className={styles.meta}>
        <span>{article.source}</span>
        <span>{article.time}</span>
      </div>
    </article>
  )
}

/** Layout wrapper for a set of NewsCards. */
export function NewsGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}
