import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const getDegrees = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`
    );

    return response.data.main.temp;
  } catch (error) {
    console.log(error);
  }
};

export const getDescription = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`
    );

    return response.data.weather[0].description;
  } catch (error) {
    console.log(error);
  }
};
