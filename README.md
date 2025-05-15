# Nimbus Weather App

**Nimbus** is a responsive and user-friendly weather application built with **React** and the **OpenWeather API**. It provides current weather conditions, hourly and 5-day forecasts, Air Quality Index (AQI), and UV Index data with a clean, dynamic UI.

---

## Features

- Search weather by city or geolocation
- Hourly and 5-day forecast
- Toggle between °C and °F
- Real-time Air Quality Index (AQI) with visual indicators
- Real-time UV Index with descriptive risk levels
- Weather-based animated icons and dynamic UI
- Auto-refresh with loading states
- Fully responsive design for all devices

---

## Technologies Used

- React 19 + Vite
- Bootstrap 5 + Bootstrap Icons
- Axios (API integration)
- OpenWeather API (Current Weather, Forecast, Air Pollution, UV Index)
- Custom Hooks and Reusable Components
- ESLint for code quality
- Responsive Design principles

---

## Project Structure

```
src/
├── App.jsx
├── components/
│   ├── AQICard.jsx
│   ├── CurrentWeather.jsx
│   ├── ExtraCode.jsx
│   ├── FiveDayForecast.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HourlyForecast.jsx
│   ├── SearchBar.jsx
│   ├── UVCard.jsx
│   └── UnitContext.jsx
├── contexts/
│   └── UnitContext.jsx
├── index.css
├── main.jsx
└── utils/
    └── api.js
```

---

## License

This project is licensed under the [MIT License](LICENSE).
