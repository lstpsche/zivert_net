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

export const setMainMapBlock = ({ state = false, blockMessage = undefined }) => ({
  type: SET_MAIN_MAP_BLOCK,
  block: { state, blockMessage }
});

export const setMainMapRef = ({ ref }) => ({
  type: SET_MAIN_MAP_REF,
  ref
});

export const setBaseLayer = ({ layerName }) => ({
  type: SET_BASE_LAYER,
  layerName
});

export const setOverlayLayer = ({ layerName, selected }) => ({
  type: SET_OVERLAY_LAYER,
  layerName, layerSelected: selected
});

export const setWeatherLayer = ({ layerName }) => ({
  type: SET_WEATHER_LAYER,
  layerName
});

export const setMapSettings = (settings) => ({
  type: SET_SETTINGS,
  settings
});

export const setSettingsOptions = (settingsOptions) => ({
  type: SET_SETTINGS_OPTIONS,
  settingsOptions
});

export const setSettingsMeasurementsPeriod = ({ startDate, endDate }) => ({
  type: SET_SETTINGS_MEASUREMENTS_PERIOD,
  startDate, endDate
});

export const setSettingsMeasurementsDiffPeriod = ({ startDate, endDate }) => ({
  type: SET_SETTINGS_MEASUREMENTS_DIFF_PERIOD,
  startDate, endDate
});
