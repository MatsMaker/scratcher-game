import { ScreenRotation } from "../types/screen";

export const ASSETS_IS_LOADED = '@ASSETS/isLoaded';
export const SCREEN_RESIZE_ACTION = '@SCREEN/resize';

export interface GameState {
	assetsIsLoaded: boolean,
	screenRotation: ScreenRotation,
}

interface BaseAction {
	type: typeof ASSETS_IS_LOADED | typeof SCREEN_RESIZE_ACTION,
}

export type GameActionTypes = BaseAction;