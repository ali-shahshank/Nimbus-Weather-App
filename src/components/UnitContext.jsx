import { createContext, useState, useEffect, useContext } from "react";

const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("unit") || "metric"; // 'metric' (°C) or 'imperial' (°F)
  });

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => useContext(UnitContext);
