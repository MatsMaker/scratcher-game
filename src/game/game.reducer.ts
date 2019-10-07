import {
  IGameState,
  ActionTypes,
  GAME_STATE,
  GET_WIN,
  START_ROUND
} from './types'
import { ASSETS_IS_LOADED } from '../core/assetsLoader/types'

const initialState: IGameState = {
  gameState: GAME_STATE.LOAD_GAME,
  win: {
    coin: 0,
    cash: 0,
  },
  roundWin: {
    coin: 0,
    cash: 0,
  }
}

export function gameReducer(
  state = initialState,
  action: ActionTypes
): IGameState {

  switch (action.type) {
    case ASSETS_IS_LOADED: {
      return {
        ...state,
        gameState: GAME_STATE.PREPARE_ROUND,
      }
    }
    case START_ROUND: {
      return {
        ...state,
        roundWin: {
          ...state.roundWin,
          coin: 0,
          cash: 0,
        }
      }
    }
    case GET_WIN: {
      return {
        ...state,
        win: {
          ...state.win,
          coin: state.win.coin + action.payload.coin,
          cash: state.win.cash + action.payload.cash,
        },
        roundWin: {
          ...state.roundWin,
          coin: state.roundWin.coin + action.payload.coin,
          cash: state.roundWin.cash + action.payload.cash,
        }
      }
    }
    default:
      return state
  }
}