export const RENDER = '@CONTAINER/WINNER_FRAME/render';
export const RE_RENDER = '@CONTAINER/WINNER_FRAME/re_render';

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER
}


export type ActionTypes = InitBackground;