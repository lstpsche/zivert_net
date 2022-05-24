import { SET_WEATHER_DATA } from "../actionTypes/weather_data";

export const setWeatherData = (weatherData) => ({
  type: SET_WEATHER_DATA,
  weatherData
})
