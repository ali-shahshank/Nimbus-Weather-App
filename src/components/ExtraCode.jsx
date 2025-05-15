{
  /* <div className="card my-4 bg-danger">
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between align-items-center bg-success">
            Air Quality Index
            {aqiData && (
              <span
                className={`badge ${getAQIDetails(aqiData.main.aqi).color}`}
              >
                {aqiData.main.aqi} - {getAQIDetails(aqiData.main.aqi).label}
              </span>
            )}
          </h5>
          {error && (
            <div className="alert alert-warning mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          {aqiData && (
            <>
              <p className="text-muted bg-warning">
                {getAQIDetails(aqiData.main.aqi).description}
              </p>
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mt-3">Primary Pollutants (µg/m³)</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      PM2.5
                      <span className="badge bg-primary rounded-pill">
                        {aqiData.components.pm2_5.toFixed(1)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      PM10
                      <span className="badge bg-primary rounded-pill">
                        {aqiData.components.pm10.toFixed(1)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Ozone (O₃)
                      <span className="badge bg-primary rounded-pill">
                        {aqiData.components.o3.toFixed(1)}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="mt-3">Other Pollutants (µg/m³)</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Nitrogen Dioxide (NO₂)
                      <span className="badge bg-primary rounded-pill">
                        {aqiData.components.no2.toFixed(1)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Sulfur Dioxide (SO₂)
                      <span className="badge bg-primary rounded-pill">
                        {aqiData.components.so2.toFixed(1)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Carbon Monoxide (CO)
                      <span className="badge bg-primary rounded-pill">
                        {(aqiData.components.co / 1000).toFixed(1)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div> */
}
