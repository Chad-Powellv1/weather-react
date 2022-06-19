import React, { useState, useEffect } from "react";
import "./App.css";

export const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    getWeather(lat, long)
      .then((weather) => {
        setWeather(weather);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });

    getForecast(lat, long).then((forecast) => {
      setForecast(forecast);
      setError(null);
    });
  }, [lat, long, error]);

  const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please enable your location in your browser.");
    }
  };

  const getWeather = async (lat, long) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
    );
    return handleResponse(response);
  };

  const getForecast = async (lat, long) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
    ).then((response) => handleResponse(response));
  };

  return <div className='app'></div>;
};
