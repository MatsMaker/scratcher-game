export const RENDER_WIN_UP = '@CONTAINER/WIN_UP/render';
export const RE_RENDER_WIN_UP = '@CONTAINER/WIN_UP/re_render';

interface InitBackground {
	type: typeof RENDER_WIN_UP | typeof RE_RENDER_WIN_UP
}


export type ActionTypes = InitBackground;