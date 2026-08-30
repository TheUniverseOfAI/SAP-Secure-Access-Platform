export interface DailyForecast {
  day: string
  high: number
  low: number
  condition: string
}

export interface WeatherSnapshot {
  location: string
  tempF: number
  condition: string
  high: number
  low: number
  humidity: number
  wind: string
  forecast: DailyForecast[]
}

/** Mock weather — no weather API integration exists yet. Location matches the Reston, VA area already used elsewhere in this app's mock data (employment history). */
export const weather: WeatherSnapshot = {
  location: 'Reston, VA',
  tempF: 68,
  condition: 'Partly Cloudy',
  high: 74,
  low: 58,
  humidity: 52,
  wind: '8 mph NW',
  forecast: [
    { day: 'Tomorrow', high: 76, low: 60, condition: 'Sunny' },
    { day: 'Wednesday', high: 71, low: 57, condition: 'Cloudy' },
    { day: 'Thursday', high: 69, low: 55, condition: 'Rain' },
  ],
}
