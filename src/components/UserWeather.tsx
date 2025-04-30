import { useEffect, useState } from "react";

import { getWeather } from "../api/requests";

import "./UserWeather.css";
import { IoWater } from "react-icons/io5";
import { FaWind } from "react-icons/fa";

import { HiMapPin } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import { WeatherData } from "../types/WeatherData";

import Loader from "./Loader";

const placesWeather = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
  "Rome",
  "Barcelona",
  "Los Angeles",
  "Bangkok",
  "Istanbul",
  "Hong Kong",
  "Singapore",
  "Sydney",
  "Shanghai",
  "Las Vegas",
  "Rio de Janeiro",
  "São Paulo",
  "Berlin",
  "Amsterdam",
  "Moscow",
];

const UserWeather = () => {
  const [userCity, setUserCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherCity, setWeatherCity] = useState<WeatherData[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [error, setError] = useState(false);

  const handleWeather = async (
    city: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const data = await getWeather(city);

    if (!data) {
      setWeather(null);
      setError(true);
      setIsLoading(false);
      return;
    }

    setWeather(data);
    setError(false);
    setIsLoading(false);

    const input = document.querySelector("#text") as HTMLInputElement;

    input.value = "";
  };

  const handleWeatherCity = async () => {
    setIsLoadingInitial(true);

    try {
      const data = await Promise.all(
        placesWeather.map((place) => getWeather(place))
      );

      const shuffled = [...data].sort(() => 0.5 - Math.random());
      const randomSelection = shuffled.slice(0, 4);

      setWeatherCity(randomSelection);
      setIsLoadingInitial(false);
    } catch (error) {
      console.error(error);
    }
  };

  const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
                    <p>
                      {weather.name}, {weather.sys.country}
                    </p>
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
                    {capitalizeFirstLetter(weather.weather[0].description)}
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
                id="text"
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
              <p>
                {weather.name}, {weather.sys.country}
              </p>
            </div>
            <div className="user-degrees">
              <h1>{Number(weather.main.temp).toFixed(0)}°C</h1>
            </div>
            <div className="user-description">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="condition"
              />
              <p>{capitalizeFirstLetter(weather.weather[0].description)}</p>
            </div>
            <div className="humidity-container">
              <div className="user-humidity">
                <IoWater className="icon-humidity" />
                <p>{weather.main.humidity} %</p>
              </div>
              <div className="user-wind">
                <FaWind className="icon-humidity" />
                <p>{weather.wind.speed.toFixed(1)} Km/h</p>
              </div>
            </div>
          </div>
        )}
        {error && (
          <p className="error">Cidade, Estado ou País não encontrado...</p>
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default UserWeather;
