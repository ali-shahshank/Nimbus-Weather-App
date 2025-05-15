import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCurrentWeather = async (city, unit = "metric") => {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, units: unit, appid: API_KEY },
  });
  return res.data;
};

export const fetchForecast = async (city, unit = "metric") => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, units: unit, appid: API_KEY },
  });
  return res.data;
};
