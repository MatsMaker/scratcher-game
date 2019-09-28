import {
  ViewPortState,
  VPActionTypes,
  VIEW_PORT_RESIZE_ACTION,
} from './types'
import * as viewPort from '../utils/viewPort';

const initialState: ViewPortState = {
  rotation: viewPort.getRotation(),
  width: viewPort.getWidth(),
  height: viewPort.getHeight(),
  centerHeight: viewPort.getHeightCenter(),
  centerWidth: viewPort.getWidthCenter(),
}

export function viewPortReducer(
  state = initialState,
  action: VPActionTypes
): ViewPortState {

  switch (action.type) {
    case VIEW_PORT_RESIZE_ACTION: {
      return {
        width: viewPort.getWidth(),
        height: viewPort.getHeight(),
        rotation: viewPort.getRotation(),
        centerHeight: viewPort.getHeightCenter(),
        centerWidth: viewPort.getWidthCenter(),
      }
    }
    default:
      return state
  }
}