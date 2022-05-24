// Weather Data tree structure:
//
// weatherData: [
//   {
//     id: weatherDataId,
//     temperature: weatherDataTemp,
//     pressureMm: weatherDataPressureMm,
//     pressurePa: weatherDataPressurePa,
//     condition: weatherDataCondition,
//     cloudness: weatherDataCloudness,
//     precipitationType: weatherDataPrecType,
//     precipitationStrength: weatherDataPrecStrength,
//     isThunder: weatherDataIsThunder,
//     windSpeed: weatherDataWindSpeed,
//     windDirection: weatherDataWindDir,
//     humidity: weatherDataHumidity,
//     staticMeasurementId: weatherDataStaticMeasurementId,
//     createdAt: weatherDataCreatedAt
//   },
//   ...
// ]

import { SET_WEATHER_DATA } from "../actionTypes/weather_data";

function weatherData(state = [], action) {
  const { type: actionType, weatherData } = action;

  switch(actionType) {
    case SET_WEATHER_DATA:
      return weatherData;

    default:
      return state;
  }
}

export default weatherData;
