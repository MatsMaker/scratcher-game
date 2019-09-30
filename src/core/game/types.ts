export const PLAY = '@CORE/GAME/play';
export const RULES_GAME = '@CORE/GAME/rules_game';

interface InitBackground {
	type: typeof PLAY | typeof RULES_GAME
}


export type ActionTypes = InitBackground;