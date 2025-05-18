import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UVCard from "./UVCard";
import "../index.css";

function AQICard({ city }) {
  const [aqiData, setAqiData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null });

  // Get coordinates from city name or geolocation
  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        let coords;

        if (city) {
          // Fetch coordinates for the specified city
          const geoRes = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
              import.meta.env.VITE_API_KEY
            }`
          );
          const geoData = await geoRes.json();
          if (geoData.length > 0) {
            coords = { lat: geoData[0].lat, lon: geoData[0].lon };
          } else {
            throw new Error("City not found");
          }
        } else {
          // Fallback to geolocation
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
        }

        setLocation(coords);
      } catch (err) {
        console.warn("Location detection failed, using fallback (Toronto)");
        setLocation({ lat: 43.65107, lon: -79.347015 });
        setError("Couldn't detect your location. Showing Toronto data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [city]);

  // Fetch AQI data when coordinates change
  useEffect(() => {
    if (!location.lat || !location.lon) return;

    const fetchAQI = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${
            location.lat
          }&lon=${location.lon}&appid=${import.meta.env.VITE_API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch AQI data");
        const data = await res.json();
        setAqiData(data.list[0]);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAqiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
  }, [location]);

  const getAQIDetails = (aqi) => {
    const levels = [
      {
        label: "Good",
        color: "bg-success",
        description: "Air quality is satisfactory",
      },
      {
        label: "Fair",
        color: "bg-info",
        description: "Acceptable air quality",
      },
      {
        label: "Moderate",
        color: "bg-warning",
        description: "Sensitive groups should limit outdoor exertion",
      },
      {
        label: "Poor",
        color: "bg-danger",
        description: "Health effects possible for everyone",
      },
      {
        label: "Very Poor",
        color: "bg-dark",
        description: "Health warning of emergency conditions",
      },
    ];

    return (
      levels[aqi - 1] || {
        label: "Unknown",
        color: "bg-secondary",
        description: "No data available",
      }
    );
  };

  if (loading && !aqiData) {
    return (
      <div className="card my-4">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-12 col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-center">
        <div
          className="col-12 col-md-6 bg-light p-2 p-md-4 rounded-4 border text-dark"
          id="AQI-card"
        >
          <div className="row d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6  d-flex flex-column justify-content-between align-items-start p-4 p-md-2">
              <div className="container py-3">
                <h2 className="fs-3 fw-light">Air Quality Index</h2>
                <h5 className="text-secondary fw-light">Live AQI Index</h5>
              </div>
              <ul className="list-unstyled w-100">
                <li>
                  <h6 className="mt-3 fw-bold">Pollutants (µg/m³)</h6>
                </li>
                <li className=" d-flex justify-content-between align-items-center">
                  PM2.5
                  <span className="text-dark rounded-pill">
                    {aqiData.components?.pm2_5?.toFixed(1) ?? "N/A"}
                  </span>
                </li>
                <li className=" d-flex justify-content-between align-items-center">
                  PM10
                  <span className="text-dark  rounded-pill">
                    {aqiData.components?.pm10?.toFixed(1) ?? "N/A"}
                  </span>
                </li>
                <li className=" d-flex justify-content-between align-items-center">
                  Ozone (O₃)
                  <span className="text-dark  rounded-pill">
                    {aqiData.components?.no2?.toFixed(1) ?? "N/A"}
                  </span>
                </li>
                <li className=" d-flex justify-content-between align-items-center">
                  Nitrogen Dioxide (NO₂)
                  <span className="text-dark  rounded-pill">
                    {aqiData.components?.so2?.toFixed(1) ?? "N/A"}
                  </span>
                </li>
                <li className=" d-flex justify-content-between align-items-center">
                  Sulfur Dioxide (SO₂)
                  <span className="text-dark  rounded-pill">
                    {(aqiData.components?.co / 1000)?.toFixed(1) ?? "N/A"}
                  </span>
                </li>
                <li className=" d-flex justify-content-between align-items-center">
                  Carbon Monoxide (CO)
                  <span className="text-dark  rounded-pill">
                    {(aqiData.components?.co / 1000).toFixed(1) ?? "N/A"}
                  </span>
                </li>
              </ul>
            </div>
            {/* AQI Data */}
            <div className="col-12 col-md-6  d-flex flex-column justify-content-end align-items-center">
              {/* Error Handing for ADI data */}
              <ul className="list-unstyled d-flex justify-content-center align-items-center ">
                <li>
                  {error && (
                    <div className="alert alert-warning mb-3">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                    </div>
                  )}
                </li>
              </ul>
              <h1 className="fs-1 fw-light">
                {aqiData && (
                  <ul className=" list-unstyled d-flex flex-column justify-content-center align-items-center">
                    <li className="display-1 d-flex justify-content-center align-items-center">
                      {aqiData.main.aqi}
                    </li>
                    <li className="d-flex justify-content-center align-items-center">
                      <h5>
                        {" "}
                        <i
                          className={`bi bi-circle-fill me-2 fs-6 ${getAQIDetails(
                            aqiData.main.aqi
                          ).color.replace("bg-", "text-")}`}
                        ></i>
                        {getAQIDetails(aqiData.main.aqi).label}
                      </h5>
                    </li>
                    <li>
                      {" "}
                      <h6 className="text-center">
                        {getAQIDetails(aqiData.main.aqi).description}
                      </h6>{" "}
                    </li>
                  </ul>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AQICard.propTypes = {
  city: PropTypes.string,
};

export default AQICard;
