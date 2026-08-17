function Weatger({ weather }) {
  return (
    <div className="weather-card">

      <div className="location">
        <h2>
          {weather.city}, {weather.country}
        </h2>

        <p>
          {weather.day} • {weather.date}
        </p>
      </div>

      <div className="main-weather">

        <div className="big-icon">
          {weather.icon}
        </div>

        <div>
          <h1>
            {weather.temperature}°C
          </h1>

          <p>
            {weather.condition}
          </p>
        </div>

      </div>

      <div className="weather-details">

        <div className="detail">
          <span>🌡️</span>
          <p>Feels Like</p>
          <strong>
            {weather.feelsLike}°C
          </strong>
        </div>

        <div className="detail">
          <span>💧</span>
          <p>Humidity</p>
          <strong>
            {weather.humidity}%
          </strong>
        </div>

        <div className="detail">
          <span>💨</span>
          <p>Wind</p>
          <strong>
            {weather.wind} m/s
          </strong>
        </div>

        <div className="detail">
          <span>🔵</span>
          <p>Pressure</p>
          <strong>
            {weather.pressure} hPa
          </strong>
        </div>

      </div>

    </div>
  );
}

export default Weatger;