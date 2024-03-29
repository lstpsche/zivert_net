// MainMap tree structure:
//
// mainMap: {
//   block: {
//     state: boolean,
//     blockMessage: stringAtLoader
//   }
//   layers: {
//     base: {
//       regularMap: { selected: boolean }
//     },
//     overlays: {
//       dimmer: { selected: boolean },
//       measurements: { selected: boolean },
//       heatmap: { selected: boolean },
//       hexagons: { selected: boolean }
//     },
//     weatherOverlays: {
//       temperature: { selected: boolean },
//       wind: { selected: boolean },
//       precipitation: { selected: boolean },
//       clouds: { selected: boolean }
//     }
//   },
//   settings: {
//     units: string
//     measurementsPeriod: {
//       startDate: date,
//       endDate: date
//     }
//   },
//   settingsOptions: {
//     units: arrayOfStrings
//   },
//   mainMapRef: Map leafletElement
// }
//

import {
  SET_MAIN_MAP_BLOCK,
  SET_BASE_LAYER,
  SET_OVERLAY_LAYER,
  SET_WEATHER_LAYER,
  SET_MAIN_MAP_REF,
  SET_SETTINGS,
  SET_SETTINGS_OPTIONS,
  SET_SETTINGS_MEASUREMENTS_PERIOD,
  SET_SETTINGS_MEASUREMENTS_DIFF_PERIOD
} from "../actionTypes/main_map";

function mainMap(state = {}, action) {
  const { type: actionType, block, layerName, layerSelected, ref, settings, settingsOptions, startDate, endDate } = action;

  switch(actionType) {
    case SET_MAIN_MAP_BLOCK:
      return { ...state, block };

    case SET_BASE_LAYER:
      let base = state.layers.base;
      Object.keys(base).map(name =>
        base[name].selected = (name === layerName)
      );
      return { ...state, layers: { ...state.layers, base } };

    case SET_OVERLAY_LAYER:
      let overlays = {
        ...state.layers.overlays,
        [layerName]: { selected: layerSelected }
      };
      return { ...state, layers: { ...state.layers, overlays } };

    case SET_WEATHER_LAYER:
      let weatherOverlays = state.layers.weatherOverlays;
      Object.keys(weatherOverlays).map(name =>
        weatherOverlays[name].selected = (name === layerName)
      );
      return { ...state, layers: { ...state.layers, weatherOverlays } };

    case SET_MAIN_MAP_REF:
      return { ...state, ref };

    case SET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...settings } };

    case SET_SETTINGS_OPTIONS:
      return { ...state, settingsOptions };

    case SET_SETTINGS_MEASUREMENTS_PERIOD:
      return { ...state, settings: { ...state.settings, measurementsPeriod: { startDate, endDate } } };

    case SET_SETTINGS_MEASUREMENTS_DIFF_PERIOD:
      let type = "";
      let date = new Date;

      if (!!startDate) {
        type = "startDate";
        date = startDate;
      } else {
        type = "endDate";
        date = endDate;
      }

      return { ...state, settings: { ...state.settings, measurementsDiffPeriod: { ...state.settings.measurementsDiffPeriod, [type]: date } } };

    default:
      return state;
  }
}

export default mainMap;
