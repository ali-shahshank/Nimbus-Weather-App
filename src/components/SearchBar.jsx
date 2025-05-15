import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  const fetchSuggestions = debounce(async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(input);
    return () => fetchSuggestions.cancel();
  }, [input]);

  const handleSelect = (city) => {
    setInput("");
    setSuggestions([]);
    setError("");
    setActiveIndex(-1);
    onSearch(`${city.name},${city.country}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4 p-md-4  d-none d-md-flex"></div>
          <div className="col-sm-12 col-md-2 p-2 p-md-4"></div>
          <div className="col-sm-12 col-md-8  p-4 py-2  d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <div className="col-12 col-md-10 p-0 ">
              <input
                type="search"
                className="form-control form-control-lg rounded-pill"
                placeholder="Search city..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-autocomplete="list"
                aria-expanded={suggestions.length > 0}
                aria-controls="suggestion-list"
                aria-activedescendant="searchLocation"
              />
            </div>
            <div className="col-12 col-md-2 p-0">
              <button
                className="btn btn-lg btn-primary px-4 rounded-pill w-100"
                onClick={() => handleSelect({ name: input, country: "" })}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 p-2 p-md-4 d-none d-md-block"></div>
          <div className="col-sm-12 col-md-12 p-2 p-md-4 "></div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul
          ref={listRef}
          id="suggestion-list"
          className="list-group position-absolute w-100 z-3"
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {suggestions.map((city, idx) => (
            <li
              key={idx}
              className={`list-group-item list-group-item-action ${
                idx === activeIndex ? "active" : ""
              }`}
              onClick={() => handleSelect(city)}
              style={{ cursor: "pointer" }}
            >
              {city.name}, {city.state ? `${city.state}, ` : ""}
              {city.country}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-danger mt-1">{error}</div>}
    </>
  );
};

export default SearchBar;
