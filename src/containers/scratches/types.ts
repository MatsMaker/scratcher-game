export const RENDER = '@CONTAINER/SCRATCHES/render';
export const RE_RENDER = '@CONTAINER/SCRATCHES/re_render';

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER
}


export type ActionTypes = InitBackground;