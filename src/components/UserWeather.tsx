import { ReactElement, useEffect, useState } from "react";
import { getDegrees, getDescription } from "../api/requests";

import "./UserWeather.css";
import { FiCloudRain, FiSearch, FiSun } from "react-icons/fi";
import { HiMapPin } from "react-icons/hi2";
import { BiCloud } from "react-icons/bi";
import { BsCloudSnow } from "react-icons/bs";

const placesWeather = ["Paris", "Moscou", "Londres", "Dubai", "Indaiatuba"];

const UserWeather = () => {
  const [degrees, setDegrees] = useState<number[] | null>(null);
  const [descriptions, setDescriptions] = useState<string[] | null>(null);
  const [userCity, setUserCity] = useState<string>("");
  const [degreesUserCity, setDegreesUserCity] = useState<number>();
  const [descriptionUserCity, setDescriptionUserCity] = useState<string>("");

  useEffect(() => {
    const handleDegrees = async () => {
      const data = await Promise.all(
        placesWeather.map((place) => getDegrees(place))
      );

      setDegrees(data);
    };

    const handleDescriptions = async () => {
      const data = await Promise.all(
        placesWeather.map((place) => getDescription(place))
      );

      setDescriptions(data);
    };

    handleDegrees();
    handleDescriptions();
  }, []);

  const handleWeatherUserCity = async (e: React.FormEvent) => {
    e.preventDefault();

    const degree = await getDegrees(userCity);

    const description = await getDescription(userCity);

    setDegreesUserCity(degree);

    setDescriptionUserCity(description);
  };

  const getIconWeather = (description: string): ReactElement | null => {
    switch (description) {
      case "céu limpo":
        return <FiSun className="icon sun" />;

      case "algumas nuvens":
        return <FiSun className="icon sun" />;

      case "nuvens dispersas":
        return <FiSun className="icon sun" />;

      case "nuvens quebradas":
        return <FiSun className="icon sun" />;

      case "neve":
        return <BsCloudSnow className="icon" />;

      case "névoa":
        return <BiCloud className="icon" />;

      case "nublado":
        return <BiCloud className="icon" />;

      case "pouca neve":
        return <BsCloudSnow className="icon" />;

      case "neve pesada":
        return <BsCloudSnow className="icon" />;

      default:
        return <FiCloudRain className="icon" />;
    }
  };

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
              {descriptions && getIconWeather(descriptions[index])}
              <p className="description">{descriptions?.[index]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="weather-input">
        <div className="input-container">
          <form onSubmit={handleWeatherUserCity}>
            <div className="input">
              <input
                type="text"
                placeholder="Inserir local"
                onChange={(e) => setUserCity(e.target.value)}
              />
              <button type="submit">
                <FiSearch className="search" />
              </button>
            </div>
          </form>
        </div>
        {degreesUserCity && (
          <div className="user-weather">
            <div className="user-city">
              <HiMapPin className="icon-pin" />
              <p>{userCity}</p>
            </div>
            <h1>{degreesUserCity}°C</h1>
            <div className="user-degrees">
              {descriptionUserCity && getIconWeather(descriptionUserCity)}
              <p>{descriptionUserCity}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWeather;
