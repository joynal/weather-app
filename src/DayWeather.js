import React from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DayWeather = ({ dayNum, icon, temp, details }) => (
  <div className="day-common">
    <p>{temp}° C</p>
    <i>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={details}
      />
    </i>
    <span>{days[dayNum]}</span>
    <span>{details}</span>
  </div>
);

export default DayWeather;
