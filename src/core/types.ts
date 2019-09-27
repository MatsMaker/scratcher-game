export const ASSETS_IS_LOADED = '@ASSETS/isLoaded';

export interface GameState {
  assetsIsLoaded: boolean,
}

interface AssetsIsLoadedAction {
	type: typeof ASSETS_IS_LOADED,
}

export type GameActionTypes = AssetsIsLoadedAction;