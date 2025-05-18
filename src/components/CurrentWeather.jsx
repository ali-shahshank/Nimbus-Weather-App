import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../utils/api";
import { useUnit } from "../contexts/UnitContext";
import "../index.css";

const CurrentWeather = ({ city }) => {
  const { unit } = useUnit();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchCurrentWeather(city, unit);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError("City not found.");
        setWeather(null);
      }
    };
    if (city) loadWeather();
  }, [city, unit]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!weather) return <p>Loading...</p>;
  const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
    weather.sys.country
  );

  return (
    <>
      <div className="container-fluid" id="current-weather">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4 p-md-5 d-flex justify-content-center align-items-center">
            <div
              className="col-12 col-md-12 p-2 d-flex flex-column flex-md-row rounded-4 bg-primary text-light"
              id="current-weather-card"
            >
              {/* Left Column - Weather Details */}
              <div
                className="col-sm-12 col-md-6 p-4 p-md-4 px-md-5 d-flex justify-content-start align-items-center"
                id="current-weather-left"
              >
                <ul className="list-unstyled">
                  <li className="my-2">
                    <h2 className="fs-2 fw-light">{weather.name}</h2>
                  </li>
                  <li>
                    <h5 className="fs-5 fw-light">{countryName}</h5>
                  </li>
                  <li className="my-2">
                    <h1 className="display-1">
                      {Math.round(weather.main.temp)}°
                      {unit === "metric" ? "C" : "F"}
                    </h1>
                  </li>
                  <li className="my-2">
                    <h6 className="fs-6">
                      Fells Like: {Math.round(weather.main.feels_like)}°{" "}
                    </h6>
                  </li>
                  <li className="my-3">
                    <h6 className="fs-6 ">
                      <i className="bi bi-droplet-fill me-2"></i> Humidity:{" "}
                      {weather.main.humidity}%
                    </h6>
                  </li>
                  <li>
                    <h6 className="fs-6 ">
                      <i className="bi bi-wind me-2"></i> Wind:{" "}
                      {Math.round(weather.wind.speed)}
                      {unit === "metric" ? "m/s" : "mph"}
                    </h6>
                  </li>
                </ul>
              </div>
              {/* Right Column - Weather Icon */}
              <div
                className="col-sm-12 col-md-6 p-5 p-md-4 px-md-5 position-relative d-flex justify-content-center justify-content-md-end align-items-center"
                id="current-weather-right"
              >
                <img
                  src={`/${weather.weather[0].icon}.svg`}
                  alt={weather.weather[0].description}
                  className="p-0 img-fluid position-absolute "
                  id="weather-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
