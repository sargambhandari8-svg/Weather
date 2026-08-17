import { useState } from "react";
import SearchBox from "./components/SearchBox";
import ForeCastDay from "./components/ForeCastDay";
import Weatger from "./components/Weatger";
import "./App.css";

const nepalPlaces = {
  kathmandu: {
    name: "Kathmandu",
    temperature: 27,
    condition: "Sunny",
    icon: "☀️",
    feelsLike: 28,
    humidity: 45,
    wind: 3.2,
    pressure: 1012,
  },

  pokhara: {
    name: "Pokhara",
    temperature: 24,
    condition: "Rainy",
    icon: "🌧️",
    feelsLike: 25,
    humidity: 72,
    wind: 4.5,
    pressure: 1008,
  },

  lalitpur: {
    name: "Lalitpur",
    temperature: 26,
    condition: "Cloudy",
    icon: "☁️",
    feelsLike: 27,
    humidity: 60,
    wind: 2.8,
    pressure: 1010,
  },

  bhaktapur: {
    name: "Bhaktapur",
    temperature: 25,
    condition: "Partly Cloudy",
    icon: "🌤️",
    feelsLike: 26,
    humidity: 55,
    wind: 3.1,
    pressure: 1013,
  },

  biratnagar: {
    name: "Biratnagar",
    temperature: 31,
    condition: "Sunny",
    icon: "☀️",
    feelsLike: 34,
    humidity: 65,
    wind: 2.4,
    pressure: 1009,
  },

  bharatpur: {
    name: "Bharatpur",
    temperature: 29,
    condition: "Cloudy",
    icon: "☁️",
    feelsLike: 31,
    humidity: 68,
    wind: 3.5,
    pressure: 1011,
  },

  chitwan: {
    name: "Chitwan",
    temperature: 30,
    condition: "Rainy",
    icon: "🌧️",
    feelsLike: 33,
    humidity: 75,
    wind: 3.8,
    pressure: 1007,
  },

  butwal: {
    name: "Butwal",
    temperature: 29,
    condition: "Sunny",
    icon: "☀️",
    feelsLike: 31,
    humidity: 50,
    wind: 2.9,
    pressure: 1014,
  },

  nepalgunj: {
    name: "Nepalgunj",
    temperature: 33,
    condition: "Hot",
    icon: "🌞",
    feelsLike: 36,
    humidity: 42,
    wind: 2.1,
    pressure: 1006,
  },

  dharan: {
    name: "Dharan",
    temperature: 28,
    condition: "Cloudy",
    icon: "☁️",
    feelsLike: 30,
    humidity: 63,
    wind: 3.2,
    pressure: 1010,
  },

  janakpur: {
    name: "Janakpur",
    temperature: 32,
    condition: "Sunny",
    icon: "☀️",
    feelsLike: 35,
    humidity: 48,
    wind: 2.6,
    pressure: 1008,
  },

  hetauda: {
    name: "Hetauda",
    temperature: 28,
    condition: "Partly Cloudy",
    icon: "🌤️",
    feelsLike: 30,
    humidity: 57,
    wind: 3.4,
    pressure: 1012,
  },
};

function createWeatherDays(place) {
  const conditions = [
    {
      condition: "Sunny",
      icon: "☀️",
      change: 0,
    },
    {
      condition: "Rainy",
      icon: "🌧️",
      change: -3,
    },
    {
      condition: "Cloudy",
      icon: "☁️",
      change: -1,
    },
    {
      condition: "Partly Cloudy",
      icon: "🌤️",
      change: 2,
    },
    {
      condition: "Sunny",
      icon: "☀️",
      change: 3,
    },
  ];

  return conditions.map((weather, index) => ({
    day:
      index === 0
        ? "Today"
        : new Date(
            Date.now() + index * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-US", {
            weekday: "short",
          }),

    date: new Date(
      Date.now() + index * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),

    city: place.name,
    country: "Nepal",

    temperature: place.temperature + weather.change,

    feelsLike:
      place.feelsLike + weather.change,

    condition: weather.condition,

    icon: weather.icon,

    humidity: Math.max(
      30,
      Math.min(90, place.humidity + index * 4)
    ),

    wind: Number(
      (place.wind + index * 0.4).toFixed(1)
    ),

    pressure: place.pressure + index,

  }));
}

function App() {
  const [selectedDay, setSelectedDay] = useState(0);

  const [weatherData, setWeatherData] = useState(
    createWeatherDays(nepalPlaces.kathmandu)
  );

  const handleSearch = (searchText) => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return;
    }

    /*
      First check our Nepal city data.
    */
    const foundPlace = nepalPlaces[search];

    if (foundPlace) {
      setWeatherData(createWeatherDays(foundPlace));
      setSelectedDay(0);
      return;
    }

    /*
      Prototype fallback:
      If the user enters another Nepal place
      that is not in our list, we still display
      a prototype weather result for that place.
    */

    const formattedName = searchText
      .trim()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join(" ");

    const fallbackPlace = {
      name: formattedName,
      temperature: 26,
      condition: "Partly Cloudy",
      icon: "🌤️",
      feelsLike: 27,
      humidity: 58,
      wind: 3.1,
      pressure: 1012,
    };

    setWeatherData(
      createWeatherDays(fallbackPlace)
    );

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