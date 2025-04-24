import { useEffect, useState } from "react";
import { getDegrees, getDescription } from "../api/requests";

const placesWeather = ["paris", "roma", "londres", "dubai"];

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
    <>
      {degrees?.map((degree) => (
        <div>
          <h2>{degree}</h2>
        </div>
      ))}
      {descriptions?.map((description) => (
        <div>
          <h2>{description}</h2>
        </div>
      ))}
    </>
  );
};

export default UserWeather;
