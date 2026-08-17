function ForeCastDay({
  weatherData,
  selectedDay,
  setSelectedDay,
}) {
  return (
    <div className="forecast-container">

      {weatherData.map((weather, index) => (
        <button
          key={weather.date}
          className={`forecast-day ${
            selectedDay === index
              ? "active"
              : ""
          }`}
          onClick={() =>
            setSelectedDay(index)
          }
        >
          <p className="day-name">
            {weather.day}
          </p>

          <p className="date">
            {weather.date}
          </p>

          <div className="weather-icon">
            {weather.icon}
          </div>

          <h3>
            {weather.temperature}°C
          </h3>

          <p>
            {weather.condition}
          </p>
        </button>
      ))}

    </div>
  );
}

export default ForeCastDay;