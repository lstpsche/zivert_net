import {
  SET_FULL_PAGE_BLOCK
} from "../actionTypes/blocking";

export const setFullPageBlock = ({ state, blockMessage = undefined }) => ({
  type: SET_FULL_PAGE_BLOCK,
  fullPage: { state, blockMessage }
})
