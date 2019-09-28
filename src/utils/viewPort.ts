import { ViewPortRotation } from "../types/viewPort";

export function waitReRenderViewPort(cb: Function) {
	const timeout: number = Number(process.env.RE_RENDER_TIMEOUT) || 300;
	setTimeout(cb, timeout);
}

export function getRotation(): ViewPortRotation {
	return (window.innerHeight > window.innerWidth) ? ViewPortRotation.PORTRAIT : ViewPortRotation.LANDSCAPE
}

export function getWidth() {
	return window.innerWidth;
}

export function getHeight() {
	return window.innerHeight;
}

export function getWidthCenter(): number {
	return window.innerWidth / 2;
}

export function getHeightCenter(): number {
	return window.innerHeight / 2;
}