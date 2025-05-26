type WeatherIconProps = {
  iconCode: string
  alt: string
}

export const WeatherIcon = ({ iconCode, alt }: WeatherIconProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  return (
    <img
      className="weather-icon"
      src={iconUrl}
      alt={alt}
      height={40}
      width={40}
    />
  )
}
