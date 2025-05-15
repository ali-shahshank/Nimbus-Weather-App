import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../index.css";

function UVCard({ city }) {
  const [uvData, setUvData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [peakUVTime, setPeakUVTime] = useState(null);

  // Get coordinates
  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        let coords = city
          ? await getCityCoords(city)
          : await getCurrentCoords();
        setLocation(coords);
      } catch {
        setLocation({ lat: 43.65107, lon: -79.347015 });
        setError("Showing Toronto data");
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinates();
  }, [city]);

  // Fetch UV data
  useEffect(() => {
    if (!location.lat || !location.lon) return;

    const fetchUVData = async () => {
      setLoading(true);
      try {
        const [currentUV, forecastUV] = await Promise.all([
          fetchUV(location),
          fetchUVForecast(location),
        ]);
        setUvData(currentUV);
        setPeakUVTime(getPeakTime(forecastUV));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUVData();
  }, [location]);

  const getUVLevel = (value) => {
    const levels = [
      {
        level: "Low",
        color: "text-uv-low",
        max: 2,
        gear: "Optional",
        burn: "60+ min",
        reflect: "Minimal",
        description: "Enjoy the sun safely!",
      },
      {
        level: "Moderate",
        color: "text-uv-moderate",
        max: 5,
        gear: "Sunscreen",
        burn: "45 min",
        reflect: "+30%",
        description: "Take precautions if outside for long periods.",
      },
      {
        level: "High",
        color: "text-uv-high",
        max: 7,
        gear: "Hat, shade",
        burn: "30 min",
        reflect: "+70%",
        description: "Protection needed, especially for children.",
      },
      {
        level: "Very High",
        color: "text-uv-very-high",
        max: 10,
        gear: "Full cover",
        burn: "15 min",
        reflect: "+80%",
        description: "Take extra precautions.",
      },
      {
        level: "Extreme",
        color: "text-uv-extreme",
        max: Infinity,
        gear: "Avoid sun",
        burn: "<10 min",
        reflect: "+100%",
        description: "Avoid sun exposure.",
      },
    ];
    return levels.find((l) => value <= l.max) || levels[levels.length - 1];
  };

  if (loading) return <LoadingCard />;

  return (
    <>
      {/*UV Card*/}
      <div className="col-12 col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-center">
        <div
          className="col-12 col-md-6  p-2 p-md-4 rounded-4 text-light"
          id="UV-card"
        >
          <div className="row d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6  d-flex flex-column justify-content-between align-items-start p-4 p-md-2">
              <div className="container py-3">
                <h2 className="fs-3 fw-light">UV Index</h2>
                <h5 className=" fw-light">Live Ultraviolet Index</h5>
              </div>
              {uvData && (
                <ul className="list-unstyled w-100">
                  <li>
                    <h6 className="mt-3 fw-bold">Exposure Levels</h6>
                  </li>
                  <li className=" d-flex justify-content-between align-items-center">
                    Risk Level
                    <span
                      className={`badge rounded-pill p-1 px-2 ${getUVLevel(
                        uvData.value
                      ).color.replace("text-", "bg-")}`}
                    >
                      ({uvData.value.toFixed(1)})
                    </span>
                  </li>
                  <li className=" d-flex justify-content-between align-items-center">
                    Peak
                    <span>{peakUVTime || "Calculating..."}</span>
                  </li>
                  <li className=" d-flex justify-content-between align-items-center">
                    Burn Time
                    <span>{getUVLevel(uvData.value).burn}</span>
                  </li>
                  <li className=" d-flex justify-content-between align-items-center">
                    Gear
                    <span>{getUVLevel(uvData.value).gear}</span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center">
                    Reflect
                    <span>{getUVLevel(uvData.value).reflect}</span>
                  </li>
                  <li>
                    {" "}
                    <div
                      className="progress border mt-2"
                      style={{ height: "8px" }}
                    >
                      <div
                        className={getUVLevel(uvData.value).color.replace(
                          "text-",
                          "bg-"
                        )}
                        style={{
                          width: `${Math.min(uvData.value * 10, 100)}%`,
                        }}
                        role="progressbar"
                      />
                    </div>
                  </li>
                </ul>
              )}
            </div>
            {/* UV Data */}
            <div className="col-12 col-md-6 d-flex flex-column justify-content-end align-items-center">
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
                {uvData && (
                  <ul className=" list-unstyled d-flex flex-column justify-content-center align-items-center">
                    <li className="display-1 d-flex justify-content-center align-items-center">
                      {uvData.value.toFixed(1)}
                    </li>
                    <li className="d-flex justify-content-center align-items-center">
                      <h5>
                        <i
                          className={`bi bi-circle-fill me-2 fs-6 ${getUVLevel(
                            uvData.value
                          ).color.replace("bg-", "text-")}`}
                        ></i>
                        {getUVLevel(uvData.value).level}
                      </h5>
                    </li>
                    <li>
                      <h6 className="text-center">
                        {getUVLevel(uvData.value).description}
                      </h6>
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

const LoadingCard = () => (
  <div className="card my-4">
    <div className="card-body text-center py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

// API helpers
async function getCityCoords(city) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  if (!data.length) throw new Error("City not found");
  return { lat: data[0].lat, lon: data[0].lon };
}

async function getCurrentCoords() {
  const pos = await new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
  return { lat: pos.coords.latitude, lon: pos.coords.longitude };
}

async function fetchUV({ lat, lon }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!res.ok) throw new Error("UV data failed");
  return res.json();
}

async function fetchUVForecast({ lat, lon }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.ok ? res.json() : [];
}

function getPeakTime(forecastData) {
  if (!forecastData.length) return null;
  const peak = Math.max(...forecastData.map((d) => d.value));
  const peakItem = forecastData.find((d) => d.value === peak);
  return new Date(peakItem.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

UVCard.propTypes = {
  city: PropTypes.string,
};

export default UVCard;
