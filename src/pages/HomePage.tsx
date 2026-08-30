import { NewsCard, NewsGrid } from '../components/NewsCard'
import PageHeader from '../components/PageHeader'
import WeatherWidget from '../components/WeatherWidget'
import { articlesByCategory } from '../data/news'
import { weather } from '../data/weather'
import Breadcrumb from '../layouts/Breadcrumb'
import styles from './HomePage.module.css'

/**
 * The new app landing page (/home) — replaces the old placeholder that
 * pointed straight at the SAP portal dashboard. That dashboard (stat
 * cards, Quick Navigation, Recent Activity) still exists in full, just
 * moved to /dashboard so nothing built from the source design was lost.
 *
 * Everything here is mock content: weather (src/data/weather.ts) and a
 * news feed across four categories (src/data/news.ts). There's no
 * weather/news API integration, and the articles are invented placeholder
 * headlines, not real news - matching this project's "no fabricated
 * destination" rule, none of the news cards are clickable (see
 * NewsCard.tsx).
 */
export default function HomePage() {
  return (
    <>
      <Breadcrumb current="Home" />
      <div className={styles.page}>
        <PageHeader title="Welcome back" description="Your daily briefing — weather, and the latest across tech, AI, sports, and cybersecurity." />

        <WeatherWidget data={weather} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Tech News</div>
          <NewsGrid>
            {articlesByCategory('tech').map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </NewsGrid>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>AI News</div>
          <NewsGrid>
            {articlesByCategory('ai').map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </NewsGrid>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Sports</div>
          <NewsGrid>
            {articlesByCategory('sports').map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </NewsGrid>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Cybersecurity</div>
          <NewsGrid>
            {articlesByCategory('cybersecurity').map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </NewsGrid>
        </div>
      </div>
    </>
  )
}
