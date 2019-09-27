import {
  GameState,
  GameActionTypes,
  ASSETS_IS_LOADED
} from './types'
import { getScreenRotation } from '../utils/screen';

const initialState: GameState = {
  assetsIsLoaded: false,
  screenRotation: getScreenRotation(),
}

export function gameReducer(
  state = initialState,
  action: GameActionTypes
): GameState {

  switch (action.type) {
    case ASSETS_IS_LOADED: {
      return {
        ...state,
        assetsIsLoaded: true,
      }
    }
    default:
      return state
  }
}