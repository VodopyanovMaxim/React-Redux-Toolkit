import axios from "axios";

const todoInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const weatherInstance = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export const getTodo = (count) => todoInstance.get(`/todos?_limit=${count}`);

export const getWeather = () =>
  weatherInstance.get(
    "/forecast?latitude=47.8517&longitude=35.1171&current=temperature_2m,wind_speed_10m,wind_direction_10m",
  );
