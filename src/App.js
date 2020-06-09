import React, { useState, useEffect } from "react";

import DayWeather from "./DayWeather";

import { kToC } from "./utils";
import { weatherAPI, weatherAPIKey, cityAPI } from "./config.json";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const day = new Date().getDay();
  const items = [];

  useEffect(() => {
    const fetchData = async () => {
      const resCity = await fetch(cityAPI);
      const jsonCity = await resCity.json();

      if (jsonCity.city) setCity(jsonCity.city);

      const res = await fetch(
        `${weatherAPI}/data/2.5/forecast/daily?q=${city}&appid=${weatherAPIKey}`
      );
      const json = await res.json();
      if (json.list) setWeatherData(json.list);
    };

    fetchData();
  }, [city]);

  for (let i = 1; i < 5; i++) {
    if (weatherData[i]) {
      items.push(
        <DayWeather
          key={i}
          icon={weatherData[i].weather[0].icon}
          dayNum={day + i}
          details={weatherData[i].weather[0].description}
          temp={kToC(weatherData[i].temp.day)}
        />
      );
    }
  }

  return (
    <div className="bg">
      <div id="content" className="content">
        {weatherData[0] && <h1>{kToC(weatherData[0]?.temp?.day)}° C</h1>}

        <div>
          <h2>{city}</h2>
          {weatherData[0] && (
            <div className="info">
              <span>Humidity: {weatherData[0].humidity}%</span>
              <br />
              <span>Wind: {weatherData[0].speed} Mi/h</span>
              <br />
              <span>Pressure: {Math.ceil(weatherData[0].pressure)} hPa</span>
            </div>
          )}
        </div>

        <div className="days">{items}</div>
      </div>
    </div>
  );
};

export default App;
