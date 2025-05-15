import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import { useUnit } from "./contexts/UnitContext";
import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";
import FiveDayForecast from "./components/FiveDayForecast";
import SearchBar from "./components/SearchBar";
import AQICard from "./components/AQICard";
import UVCard from "./components/UVCard";
import Footer from "./components/Footer";

function App() {
  const [city, setCity] = useState("Toronto");
  const { unit, toggleUnit } = useUnit();
  const [error, setError] = useState("");

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${
              import.meta.env.VITE_API_KEY
            }`
          );
          const data = await res.json();
          if (data.length) {
            const city = data[0];
            setCity(`${city.name},${city.country}`); // Directly update city state
            setError(""); // Clear any previous errors
          } else {
            setError("Location not found.");
          }
        } catch {
          setError("Failed to retrieve location.");
        }
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied"
            : "Couldn't get your location"
        );
      }
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img
              src="/Nimbus-logo.png"
              alt=""
              className="img-fluid"
              style={{ height: "28px" }}
            />
          </a>
          <a
            className="btn navbar-toggler cursor-pointer shadow-none border-0"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <i className="bi bi-list fs-1 border-0"></i>
          </a>
          <div className="collapse navbar-collapse " id="mainNav">
            <ul className="navbar-nav mx-auto gap-2 d-flex flex-row justify-content-center align-items-center py-4 py-md-0">
              <li className="nav-item">
                <a
                  href=""
                  className="nav-link d-flex align-items-center justify-content-center rounded-circle bg-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "thin solid #ececec ",
                  }}
                >
                  <i className="bi bi-moon-fill"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href=""
                  className="nav-link d-flex align-items-center justify-content-center rounded-circle bg-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "thin solid #ececec",
                  }}
                >
                  <i className="bi bi-brightness-high-fill"></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav gap-2">
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary border-2 px-3 w-100 rounded-pill"
                  onClick={handleGeolocation}
                >
                  {" "}
                  Location
                  <i className="bi bi-geo-alt-fill ms-2"></i>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-primary  px-4 w-100 rounded-pill"
                  onClick={toggleUnit}
                >
                  °{unit === "metric" ? "F" : "C"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {error && (
        <div className="alert alert-warning text-center mb-0">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="container-fluid">
        <div className="row">
          <Header />
          <SearchBar onSearch={setCity} />
          <CurrentWeather city={city} />
          <HourlyForecast city={city} />
          <FiveDayForecast city={city} />
          <AQICard city={city} />
          <UVCard city={city} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
