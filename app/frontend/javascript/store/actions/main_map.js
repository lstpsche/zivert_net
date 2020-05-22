import {
  SET_MAIN_MAP_BLOCK
} from "../actionTypes/main_map";

export const setMainMapBlock = ({ state = false, blockMessage = undefined }) => ({
  type: SET_MAIN_MAP_BLOCK,
  block: { state, blockMessage }
});
