import { ASSETS_IS_LOADED, GameActionTypes, SCREEN_RESIZE_ACTION } from '../core/types'

export function assetsIsLoadedAction(): GameActionTypes {
	return {
		type: ASSETS_IS_LOADED,
	}
}

export function screenResizeAction(): GameActionTypes {
	return {
		type: SCREEN_RESIZE_ACTION,
	}
}