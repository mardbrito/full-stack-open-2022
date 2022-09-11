import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [api_key, capital]);

  return (
    <div>
      {weather.main ? (
        <div>
          <h2>weather in {capital}</h2>
          <div>temperature {weather.main.temp}° Celsius</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </div>
  );
};
export default Weather;
