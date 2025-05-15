import React from "react";
import { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Single useEffect for both time and date updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time (12-hour with AM/PM)
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Format date (e.g. "Sunday April 13, 2025")
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <div className="container-fluid  ">
        <div className="row">
          <div
            className="col-sm-12 col-md-6 p-2 p-md-5  
          "
          >
            <div className="container p-2 text-center text-md-start">
              <h1 className="fs-2">Weather App</h1>
              <h5 className="fs-5 fw-light text-secondary">
                Search Current Weather Patterns
              </h5>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-6 p-2 p-md-5 d-flex justify-content-center align-items-center
          "
          >
            <div className="container p-4 py-2 py-md-4 text-center text-md-end">
              <h5 className="">{formattedTime}</h5>
              <h6 className="fs-6">{formattedDate}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
