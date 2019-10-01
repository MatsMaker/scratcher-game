import {
  ActionTypes,
  CLEAR_SCRATCH,
  ScratchesState,
} from './types'

const initialState: ScratchesState = {
  allIsClear: false,
}

export function scratchesReducer(
  state = initialState,
  action: ActionTypes
): ScratchesState {

  switch (action.type) {
    case CLEAR_SCRATCH: {
      return {
        ...state,
        allIsClear: true,
      }
    }
    default:
      return state
  }
}