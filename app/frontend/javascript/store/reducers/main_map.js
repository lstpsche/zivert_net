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
//       geoPoints: {
//         selected: boolean
//       }
//     }
//   }
// }
//

import {
  SET_MAIN_MAP_BLOCK,
  SET_BASE_LAYER,
  SET_OVERLAY_LAYER
} from "../actionTypes/main_map";

function mainMap(state = {}, action) {
  const { type: actionType, block, layerName, selected } = action;

  switch(actionType) {
    case SET_MAIN_MAP_BLOCK:
      return { ...state, block };

    case SET_BASE_LAYER:
      var base = state.layers.base;
      Object.keys(base).map(name =>
        base[name].selected = (name === layerName) ? true : false
      );
      return { ...state, layers: { ...state.layers, base } };

    case SET_OVERLAY_LAYER:
      var overlays = {
        ...state.layers.overlays,
        [layerName]: { selected }
      };
      return { ...state, layers: { ...state.layers, overlays } };

    default:
      return state;
  }
}

export default mainMap;
