import { useEffect, useState } from "react";
import { getDegrees, getDescription } from "../api/requests";

import "./UserWeather.css";
import { FiCloudRain, FiSearch, FiSun } from "react-icons/fi";
import { HiMapPin } from "react-icons/hi2";

const placesWeather = ["paris", "roma", "londres", "dubai", "indaiatuba"];

const UserWeather = () => {
  const [degrees, setDegrees] = useState<number[] | null>(null);
  const [descriptions, setDescriptions] = useState<string[] | null>(null);

  useEffect(() => {
    const gettingDegrees = async () => {
      const data = await Promise.all(
        placesWeather.map((place) => getDegrees(place))
      );

      setDegrees(data);
    };

    const gettingDescriptions = async () => {
      const data = await Promise.all(
        placesWeather.map((place) => getDescription(place))
      );

      setDescriptions(data);
    };

    gettingDegrees();
    gettingDescriptions();
  }, []);

  return (
    <div className="weather">
      <div className="weather-places">
        {degrees?.map((degree, index) => (
          <div key={index} className="weather-temperature">
            <div className="name-degrees">
              <div className="name">
                <HiMapPin className="pin" />
                <p>{placesWeather[index]}</p>
              </div>
              <p className="degrees">{degree}°C</p>
            </div>
            <div className="icon-description">
              <FiCloudRain className="icon" />
              <p className="description">{descriptions?.[index]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="weather-input">
        <div className="input-container">
          <form>
            <div className="input">
              <input type="text" placeholder="Inserir local" />
              <button type="submit">
                <FiSearch className="search" />
              </button>
            </div>
          </form>
        </div>
        <div className="user-weather">
          <div className="user-city">
            <HiMapPin className="icon-pin" />
            <p>Indaiatuba</p>
          </div>
          <h1>27°C</h1>
          <div className="user-degrees">
            <FiSun className="icon-user sun" />
            <p>Céu limpo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWeather;
