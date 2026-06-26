const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export const fetchWeather = async (lat, lng) => {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relative_humidity_2m,uv_index&timezone=auto`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Weather fetch failed')

  const data = await response.json()
  const current = data.current_weather

  return {
    temperature: Math.round(current.temperature),
    windspeed: Math.round(current.windspeed),
    weatherCode: current.weathercode,
    condition: getWeatherCondition(current.weathercode),
    humidity: data.hourly.relative_humidity_2m[0],
    uvIndex: getUVLabel(data.hourly.uv_index[0]),
    isDay: current.is_day,
  }
}

const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear Sky'
  if (code <= 2) return 'Partly Cloudy'
  if (code === 3) return 'Overcast'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rainy'
  if (code <= 79) return 'Snowy'
  if (code <= 84) return 'Rain Showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

const getUVLabel = (uv) => {
  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}
