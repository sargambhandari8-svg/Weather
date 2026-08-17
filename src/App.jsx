import { useState } from "react";
import SearchBox from "./components/SearchBox";
import ForeCastDay from "./components/ForeCastDay";
import Weatger from "./components/Weatger";
import "./App.css";

const weatherTypes = [
  {
    condition: "Sunny",
    icon: "☀️",
  },
  {
    condition: "Rainy",
    icon: "🌧️",
  },
  {
    condition: "Cloudy",
    icon: "☁️",
  },
  {
    condition: "Partly Cloudy",
    icon: "🌤️",
  },
];

function generateWeather(placeName) {
  // Create a number from the place name.
  // This makes the same place always get the same
  // prototype weather instead of changing randomly.
  let total = 0;

  for (let i = 0; i < placeName.length; i++) {
    total += placeName.charCodeAt(i);
  }

  const temperature = 15 + (total % 25);

  const weatherIndex = total % weatherTypes.length;

  const weather = weatherTypes[weatherIndex];

  return {
    name: placeName,
    temperature,
    feelsLike: temperature + 1,
    condition: weather.condition,
    icon: weather.icon,
    humidity: 40 + (total % 45),
    wind: Number(
      (2 + (total % 40) / 10).toFixed(1)
    ),
    pressure: 1000 + (total % 20),
  };
}

function createForecast(placeName) {
  const baseWeather = generateWeather(placeName);

  return [
    {
      day: "Today",
      date: "Today",
      ...baseWeather,
    },

    {
      day: "Tue",
      date: "Tomorrow",
      ...baseWeather,
      temperature: baseWeather.temperature - 2,
      feelsLike: baseWeather.feelsLike - 2,
      condition: "Rainy",
      icon: "🌧️",
    },

    {
      day: "Wed",
      date: "In 2 days",
      ...baseWeather,
      temperature: baseWeather.temperature + 1,
      feelsLike: baseWeather.feelsLike + 1,
      condition: "Cloudy",
      icon: "☁️",
    },

    {
      day: "Thu",
      date: "In 3 days",
      ...baseWeather,
      temperature: baseWeather.temperature + 3,
      feelsLike: baseWeather.feelsLike + 3,
      condition: "Partly Cloudy",
      icon: "🌤️",
    },

    {
      day: "Fri",
      date: "In 4 days",
      ...baseWeather,
      temperature: baseWeather.temperature + 2,
      feelsLike: baseWeather.feelsLike + 2,
      condition: "Sunny",
      icon: "☀️",
    },
  ];
}

function App() {
  const [selectedDay, setSelectedDay] = useState(0);

  // Default place
  const [weatherData, setWeatherData] = useState(
    createForecast("Kathmandu")
  );

  const handleSearch = (searchText) => {
    const place = searchText.trim();

    if (!place) {
      return;
    }

    // Generate weather for ANY place
    const newWeather = createForecast(place);

    setWeatherData(newWeather);

    // Always show Today after searching
    setSelectedDay(0);
  };

  const selectedWeather = weatherData[selectedDay];

  return (
    <div className="app">
      <div className="weather-container">

        <h1 className="title">
          Weather App
        </h1>

        <SearchBox
          onSearch={handleSearch}
        />

        <ForeCastDay
          weatherData={weatherData}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        <Weatger
          weather={selectedWeather}
        />

      </div>
    </div>
  );
}

export default App;