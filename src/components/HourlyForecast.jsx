import { useEffect, useState } from "react";
import { fetchForecast } from "../utils/api";
import { useUnit } from "../contexts/UnitContext";

const HourlyForecast = ({ city }) => {
  const { unit } = useUnit();
  const [hourlyData, setHourlyData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadForecast = async () => {
      try {
        const data = await fetchForecast(city, unit);
        const next12Hours = data.list.slice(0, 12); // 3-hour intervals
        setHourlyData(next12Hours);
        setError("");
      } catch (err) {
        setError("Unable to fetch forecast.");
      }
    };
    if (city) loadForecast();
  }, [city, unit]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!hourlyData.length) return <p>Loading forecast...</p>;

  const temps = hourlyData.map((hour) => hour.main.temp);
  // const highTemp = Math.round(Math.max(...temps));
  // const lowTemp = Math.round(Math.min(...temps));

  return (
    <>
      <div className="container-fluid " id="hourly-forecast">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4 p-md-5 d-flex justify-content-center align-items-center">
            <div
              className="col-12 col-md-12 bg-primary  text-light p-2 d-flex flex-column flex-md-row rounded-4"
              id="hourly-forecast-card"
            >
              {/* Left Column - Weather Details */}
              <div
                className="col-sm-12 col-md-2  p-4 p-md-4 px-md-5 d-flex justify-content-start align-items-start"
                id="hourly-forecast-left"
              >
                <ul className="list-unstyled">
                  <li className="my-2">
                    <h2 className="fs-2 fw-light">Forecast</h2>
                  </li>
                  <li>
                    <h5 className="fs-5 fw-light">Today</h5>
                  </li>
                </ul>
              </div>
              {/* Right Column - Weather Icon */}
              <div
                className="col-sm-12  col-md-10 overflow-x-auto overflow-y-hidden p-5 p-md-4 px-md-5 position-relative d-flex justify-content-center align-items-center"
                id="hourly-forecast-right"
              >
                <div className="">
                  <div className="d-flex  gap-2  d-flex justify-content-center align-items-center ">
                    {hourlyData.map((hour, i) => (
                      <div
                        key={i}
                        className="text-center rounded p-2  py-4 min-width-100 "
                      >
                        <div>
                          {new Date(hour.dt * 1000).toLocaleTimeString([], {
                            hour: "numeric",
                            hour12: true,
                          })}
                        </div>
                        <div>
                          <img
                            src={`/${hour.weather[0].icon}.svg`}
                            alt={hour.weather[0].description}
                            style={{ width: "86px", height: "86px" }}
                          />
                        </div>

                        <div className="py-3 ">
                          <p className="fs-4">{Math.round(hour.main.temp)}°</p>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                          <ul className="list-unstyled d-flex gap-1 fs-6">
                            <li>Rain</li>
                            <li>-</li>
                            <li>{Math.round(hour.pop * 100)}%</li>
                          </ul>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          {/* <ul className="list-unstyled d-flex flex-column justify-content-between align-items-center  w-100">
                            <li className="d-flex justify-content-between align-items-center w-100 px-2">
                              <span>H</span>
                              <span>-</span>
                              <span>{highTemp}°</span>
                            </li>
                            <li className="d-flex justify-content-between align-items-center w-100 px-2">
                              <span>L</span>
                              <span>-</span>
                              <span>{lowTemp}°</span>
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HourlyForecast;
