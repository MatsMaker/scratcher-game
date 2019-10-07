import * as _ from 'lodash'
import {
  ActionTypes,
  OPEN_SCRATCH,
  ScratchesState,
  RESET_SCRATCHES,
  ScratchState,
} from './types'
import { GET_BONUS, BonusType } from '../../game/types'

const initialState: ScratchesState = {
  allIsOpen: false,
  scratches: [{
    id: 0,
    isOpen: false,
    content: BonusType.Lose,
  }, {
    id: 1,
    isOpen: false,
    content: BonusType.Lose,
  }, {
    id: 2,
    isOpen: false,
    content: BonusType.Lose,
  }, {
    id: 3,
    isOpen: false,
    content: BonusType.Lose,
  }, {
    id: 4,
    isOpen: false,
    content: BonusType.Lose,
  }, {
    id: 5,
    isOpen: false,
    content: BonusType.Lose,
  }, {
    id: 6,
    isOpen: false,
    content: BonusType.Lose,
  }]
}

export function scratchesReducer(
  state = _.cloneDeep(initialState),
  action: ActionTypes
): ScratchesState {

  switch (action.type) {
    case RESET_SCRATCHES: {
      const nextState = _.cloneDeep(initialState)
      return {
        ...nextState
      }
    }
    case GET_BONUS: {
      const { id, bonus } = action.payload
      // TODO it is bad more better will be immutable way
      const openIndex: number = _.findIndex(state.scratches, (ss: ScratchState) => ss.id === id)
      state.scratches[openIndex].content = bonus
      return {
        ...state,
      }
    }
    case OPEN_SCRATCH: {
      const { id } = action.payload
      // TODO it is bad more better will be immutable way
      const openIndex: number = _.findIndex(state.scratches, (ss: ScratchState) => ss.id === id)
      state.scratches[openIndex].isOpen = true
      const isCloses: Array<ScratchState> = _.filter(state.scratches, (ss: ScratchState) => ss.isOpen !== true)   
      return {
        ...state,
        allIsOpen: isCloses.length === 0
      }
    }
    case RESET_SCRATCHES: {
      const nextScratches: Array<ScratchState> = action.payload
      const isCloses: Array<ScratchState> = _.filter(action.payload, (ss: ScratchState) => ss.isOpen !== true)
      return {
        ...state,
        scratches: nextScratches,
        allIsOpen: isCloses.length === 0
      }
    }
    default:
      return state
  }
}