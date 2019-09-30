import {
  ViewPortState,
  VPActionTypes,
  VIEW_PORT_RESIZE_ACTION,
  VIEW_PORT_SET_SAVE_AREA,
  ViewPortBaseState,
} from './types'
import * as viewPortUtil from './utils';
import { OrientationType } from '../../types/orientation';
import { AreaSizeType } from 'core/config/types';

function getNewViewPortState(cnfgSaveArea: AreaSizeType): ViewPortBaseState {
  const width = viewPortUtil.getWidth();
  const height = viewPortUtil.getHeight();
  const saveArea = viewPortUtil.insideSizeArea({ width, height }, cnfgSaveArea);
  return {
    rotation: viewPortUtil.getRotation(),
    ratio: width / height,
    width,
    height,
    centerWidth: width / 2,
    centerHeight: height / 2,
    saveWidth: saveArea.width,
    saveHeight: saveArea.height,
    saveStartX: width - saveArea.width / 2,
    saveStartY: height - saveArea.height / 2,
    saveCenterWidth: saveArea.width / 2,
    saveCenterHeight: saveArea.height / 2
  }
}

const initialState: ViewPortState = {
  cnfgSaveWidth: 800,
  cnfgSaveHeight: 600,
  rotation: OrientationType.LANDSCAPE,
  ratio: 1,
  width: 800,
  height: 600,
  centerWidth: 400,
  centerHeight: 300,
  saveWidth: 800,
  saveHeight: 600,
  saveStartX: 0,
  saveStartY: 0,
  saveCenterWidth: 400,
  saveCenterHeight: 300,
};

export function viewPortReducer(
  state = initialState,
  action: VPActionTypes
): ViewPortState {

  switch (action.type) {
    case VIEW_PORT_SET_SAVE_AREA: {
      return {
        ...state,
        cnfgSaveWidth: action.payload.width,
        cnfgSaveHeight: action.payload.height,
      };
    }
    case VIEW_PORT_RESIZE_ACTION: {
      const newViewPortBase = getNewViewPortState({
        width: state.cnfgSaveWidth,
        height: state.cnfgSaveHeight,
      });
      return {
        ...state,
        ...newViewPortBase,
      };
    }
    default:
      return state;
  }
}