import { useEffect, useState } from "react";
import { fetchForecast } from "../utils/api";
import { useUnit } from "../contexts/UnitContext";

const FiveDayForecast = ({ city }) => {
  const { unit } = useUnit();
  const [dailyData, setDailyData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadForecast = async () => {
      try {
        const data = await fetchForecast(city, unit);
        // Reduce forecast list into daily summaries
        const dailyMap = {};
        data.list.forEach((entry) => {
          const date = entry.dt_txt.split(" ")[0];
          if (!dailyMap[date]) {
            dailyMap[date] = {
              min: entry.main.temp_min,
              max: entry.main.temp_max,
              icon: entry.weather[0].icon,
              pop: entry.pop,
            };
          } else {
            dailyMap[date].min = Math.min(
              dailyMap[date].min,
              entry.main.temp_min
            );
            dailyMap[date].max = Math.max(
              dailyMap[date].max,
              entry.main.temp_max
            );
          }
        });
        setDailyData(Object.entries(dailyMap).slice(0, 5)); // First 5 days
        setError("");
      } catch (err) {
        setError("Unable to fetch 5-day forecast.");
      }
    };

    if (city) loadForecast();
  }, [city, unit]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!dailyData.length) return <p>Loading 5-day forecast...</p>;

  return (
    <>
      {/* Five Day Forecast */}
      <div className="container-fluid" id="weekly-forecast">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4 p-md-5 d-flex justify-content-center align-items-center">
            <div
              className="col-12 col-md-12 border text-light p-2 d-flex flex-column flex-md-row rounded-4 bg-primary"
              id="weekly-forecast-card"
            >
              {/* Left Column - Weather Details */}
              <div
                className="col-sm-12 col-md-2 p-4 p-md-4 px-md-5 d-flex justify-content-start align-items-start "
                id="weekly-forecast-left"
              >
                <ul className="list-unstyled">
                  <li className="my-2">
                    <h2 className="fs-2 fw-light">Forecast</h2>
                  </li>
                  <li>
                    <h5 className="fs-5 fw-light">5 Days</h5>
                  </li>
                </ul>
              </div>
              {/* Right Column - Weather Icon */}
              <div
                className="col-sm-12 col-md-10 overflow-x-auto overflow-y-hidden p-5 p-md-4  px-md-5 position-relative d-flex justify-content-center align-items-center "
                id="weekly-forecast-right"
              >
                <div className="d-flex  gap-2  d-flex justify-content-center align-items-center  ">
                  {dailyData.map(([date, info], i) => (
                    <div
                      key={i}
                      className="text-center  rounded p-2 py-4 min-width-100  "
                    >
                      <div>
                        {new Date(date).toLocaleDateString(undefined, {
                          weekday: "short",
                        })}
                      </div>
                      <div>
                        <img
                          src={`/${info.icon}.svg`}
                          alt={info.description || "weather icon"}
                          className="img-fluid"
                          id="weekly-forecast-icon"
                        />
                      </div>
                      <div className=" d-flex justify-content-center align-items-center ">
                        <ul className="list-unstyled d-flex gap-1 fw-medium">
                          <li>Rain</li>
                          <li>-</li>
                          <li>{Math.round(info.pop * 100)}%</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-unstyled d-flex flex-column justify-content-between align-items-center">
                          <li className="d-flex justify-content-around align-items-center gap-2 px-2">
                            <span>H</span>
                            <span>-</span>
                            <span>{Math.round(info.max)}°</span>
                          </li>
                          <li className="d-flex justify-content-around align-items-center gap-2 px-2">
                            <span>L</span>
                            <span>-</span>
                            <span>{Math.round(info.min)}°</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiveDayForecast;
