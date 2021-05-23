import {
  SET_MAIN_MAP_BLOCK,
  SET_BASE_LAYER,
  SET_OVERLAY_LAYER,
  SET_MAIN_MAP_REF,
  SET_SETTINGS,
  SET_SETTINGS_UNITS,
  SET_SETTINGS_OPTIONS
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

export const setMapSettings = (settings) => ({
  type: SET_SETTINGS,
  settings
});

export const setSettingsOptions = (settingsOptions) => ({
  type: SET_SETTINGS_OPTIONS,
  settingsOptions
});
