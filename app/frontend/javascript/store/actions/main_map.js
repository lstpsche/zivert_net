import {
  SET_MAIN_MAP_BLOCK,
  SET_BASE_LAYER,
  SET_OVERLAY_LAYER
} from "../actionTypes/main_map";

export const setMainMapBlock = ({ state = false, blockMessage = undefined }) => ({
  type: SET_MAIN_MAP_BLOCK,
  block: { state, blockMessage }
});

export const setBaseLayer = ({ layerName }) => ({
  type: SET_BASE_LAYER,
  layerName
});

export const setOverlayLayer = ({ layerName, selected }) => ({
  type: SET_OVERLAY_LAYER,
  layerName, selected
});
