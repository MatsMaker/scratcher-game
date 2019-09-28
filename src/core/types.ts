export const ASSETS_IS_LOADED = '@ASSETS/isLoaded';

export interface GameState {
	assetsIsLoaded: boolean,
}

interface BaseAction {
	type: typeof ASSETS_IS_LOADED
}

export type GameActionTypes = BaseAction;