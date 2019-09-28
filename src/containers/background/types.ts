export const RENDER_BACKGROUND = '@Background/renderBackground';
export const RE_RENDER_BACKGROUND = '@Background/reRenderBackground';

interface InitBackground {
	type: typeof RENDER_BACKGROUND | typeof RE_RENDER_BACKGROUND
}


export type ActionTypes = InitBackground;