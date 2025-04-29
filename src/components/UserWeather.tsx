import { useEffect, useState } from "react";

import { getWeather } from "../api/requests";

import "./UserWeather.css";

import { HiMapPin } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import { WeatherData } from "../types/WeatherData";

import Loader from "./Loader";

const placesWeather = ["Paris", "Moscou", "Londres", "Dubai"];

const UserWeather = () => {
  const [userCity, setUserCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherCity, setWeatherCity] = useState<WeatherData[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);

  const handleWeather = async (
    city: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const data = await getWeather(city);

    setWeather(data);

    setIsLoading(false);
  };

  const handleWeatherCity = async () => {
    setIsLoadingInitial(true);

    try {
      const data = await Promise.all(
        placesWeather.map((place) => getWeather(place))
      );

      setWeatherCity(data); // Garante que só dados válidos vão para o estado

      setIsLoadingInitial(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleWeatherCity();
  }, []);

  return (
    <div className="weather">
      <div className="weather-places">
        {isLoadingInitial && <Loader />}
        {weatherCity.map(
          (weather) =>
            weather && (
              <div key={weather.id} className="weather-temperature">
                <div className="name-degrees">
                  <div className="name">
                    <HiMapPin className="pin" />
                    <p>{weather.name}</p>
                  </div>
                  <p className="degrees">
                    {Number(weather.main.temp).toFixed(0)}°C
                  </p>
                </div>
                <div className="icon-description">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="condition"
                  />
                  <p className="description">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
      <div className="weather-input">
        <div className="input-container">
          <form onSubmit={(e) => handleWeather(userCity, e)}>
            <div className="input">
              <input
                type="text"
                placeholder="Inserir local"
                onChange={(e) => setUserCity(e.target.value)}
              />
              <button type="submit">
                <FiSearch />
              </button>
            </div>
          </form>
        </div>
        {weather && (
          <div className="user-weather">
            <div className="user-city">
              <HiMapPin className="icon-pin" />
              <p>{weather.name}</p>
            </div>
            <h1>{Number(weather.main.temp).toFixed(0)}°C</h1>
            <div className="user-degrees">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="condition"
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default UserWeather;
