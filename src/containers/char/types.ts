export const RENDER_CHAR = "@CONTAINER/CHAR/render";
export const RE_RENDER_CHAR = "@CONTAINER/CHAR/re_render";

interface RenderChar {
	type: typeof RENDER_CHAR | typeof RE_RENDER_CHAR
}


export type ActionTypes = RenderChar;