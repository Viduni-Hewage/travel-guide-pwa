export const getLocationName = async (lat, lng) => {
  if (lat == null || lng == null) {
    return null
  }

  try {
    const url =
      `https://api.bigdatacloud.net/data/reverse-geocode-client` +
      `?latitude=${lat}` +
      `&longitude=${lng}` +
      `&localityLanguage=en`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to reverse geocode location')
    }

    const data = await response.json()

    const city = data.city || data.locality
    const country = data.countryName

    if (!city && !country) {
      return null
    }

    if (city && country) {
      return `${city}, ${country}`
    }

    return city || country
  } catch (error) {
    console.error('Reverse geocoding failed:', error)
    return null
  }
}
