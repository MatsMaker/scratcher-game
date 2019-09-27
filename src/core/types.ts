import { ScreenRotation } from "d.ts/screen";

export const ASSETS_IS_LOADED = '@ASSETS/isLoaded';

export interface GameState {
	assetsIsLoaded: boolean,
	screenRotation: ScreenRotation,
}

interface AssetsIsLoadedAction {
	type: typeof ASSETS_IS_LOADED,
}

export type GameActionTypes = AssetsIsLoadedAction;