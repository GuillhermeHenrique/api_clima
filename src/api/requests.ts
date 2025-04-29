import axios from "axios";

const apiKey = "a130530db3c28fcf5d6c2390958b89d3";

export const getWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
