import {
  GameState,
  GameActionTypes,
  ASSETS_IS_LOADED
} from './types'
import { ScreenRotation } from '../d.ts/screen';

const initialState: GameState = {
  assetsIsLoaded: false,
  screenRotation: ScreenRotation.LANDSCAPE,
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