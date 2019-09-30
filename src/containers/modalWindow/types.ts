export const RENDER = '@CONTAINER/MODAL_WINDOW/render';
export const RE_RENDER = '@CONTAINER/MODAL_WINDOW/re_render';

interface InitBackground {
	type: typeof RENDER | typeof RE_RENDER
}


export type ActionTypes = InitBackground;