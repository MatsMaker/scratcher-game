export const PLAY = '@GAME/play';
export const RULES_GAME = '@GAME/rules_game';

interface InitBackground {
	type: typeof PLAY | typeof RULES_GAME
}


export type ActionTypes = InitBackground;