// MainMap tree structure:
//
// mainMap: {
//   block: {
//     state: boolean,
//     blockMessage: stringAtLoader
//   }
//   layers: {
//     base: {
//       regularMap: {
//         selected: boolean
//       }
//     },
//     overlays: {
//       dimmer: {
//         selected: boolean
//       },
//       measurements: {
//         selected: boolean
//       }
//     }
//   },
//   settings: {
//     units: string
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
  SET_MAIN_MAP_REF,
  SET_SETTINGS,
  SET_SETTINGS_OPTIONS
} from "../actionTypes/main_map";

function mainMap(state = {}, action) {
  const { type: actionType, block, layerName, layerSelected, ref, settings, units, settingsOptions } = action;

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
        [layerName]: { layerSelected }
      };
      return { ...state, layers: { ...state.layers, overlays } };

    case SET_MAIN_MAP_REF:
      return { ...state, ref };

    case SET_SETTINGS:
      return { ...state, settings };

    case SET_SETTINGS_OPTIONS:
      return { ...state, settingsOptions };

    default:
      return state;
  }
}

export default mainMap;
