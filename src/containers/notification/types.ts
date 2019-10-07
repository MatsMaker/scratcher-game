export const RENDER = '@CONTAINER/NOTIFICATION/render';
export const RE_RENDER = '@CONTAINER/NOTIFICATION/re_render';

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER
}


export type ActionTypes = InitBackground;