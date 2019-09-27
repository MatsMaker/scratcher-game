import { ASSETS_IS_LOADED, GameActionTypes } from '../core/types'

export function assetsIsLoadedAction(): GameActionTypes {
	return {
		type: ASSETS_IS_LOADED,
	}
}