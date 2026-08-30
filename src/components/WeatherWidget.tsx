import type { ReactNode } from 'react'
import type { WeatherSnapshot } from '../data/weather'
import styles from './WeatherWidget.module.css'

const CONDITION_ICON: Record<string, ReactNode> = {
  'Partly Cloudy': (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  Sunny: (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  Cloudy: (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  Rain: (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.75 15.75l-1.5 3m3.75-3l-1.5 3m3.75-3l-1.5 3M12 8.25a5.25 5.25 0 015.25 5.25c1.657 0 3-1.343 3-3 0-1.5-1.1-2.74-2.535-2.965A5.251 5.251 0 006.75 8.25a3.75 3.75 0 00-.75 7.421" />
    </svg>
  ),
}

/** Mock weather widget for the /home landing page — see src/data/weather.ts. */
export default function WeatherWidget({ data }: { data: WeatherSnapshot }) {
  return (
    <div className={styles.widget}>
      <div className={styles.now}>
        <div className={styles.icon}>{CONDITION_ICON[data.condition]}</div>
        <div>
          <div className={styles.temp}>{data.tempF}°F</div>
          <div className={styles.condition}>{data.condition}</div>
          <div className={styles.location}>{data.location}</div>
        </div>
        <div className={styles.stats}>
          <div>
            H:{data.high}° L:{data.low}°
          </div>
          <div>Humidity {data.humidity}%</div>
          <div>Wind {data.wind}</div>
        </div>
      </div>
      <div className={styles.forecast}>
        {data.forecast.map((f) => (
          <div className={styles.forecastDay} key={f.day}>
            <div className={styles.forecastLabel}>{f.day}</div>
            <div className={styles.forecastIcon}>{CONDITION_ICON[f.condition]}</div>
            <div className={styles.forecastTemps}>
              {f.high}° / {f.low}°
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
