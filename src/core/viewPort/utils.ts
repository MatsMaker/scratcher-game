import { AreaSizeType } from "core/config/types";
import { OrientationType } from "../../types/orientation";

export function waitReRenderViewPort(cb: Function) {
	const timeout: number = Number(process.env.RE_RENDER_TIMEOUT) || 300;
	setTimeout(cb, timeout);
}

export function getRotation(): OrientationType {
	return (window.innerHeight > window.innerWidth) ? OrientationType.PORTRAIT : OrientationType.LANDSCAPE
}

export function getWidth() {
	return window.innerWidth;
}

export function getHeight() {
	return window.innerHeight;
}

export function insideSizeArea(inner: AreaSizeType, wrapper: AreaSizeType): AreaSizeType {
	const ratio = inner.width / inner.height;
	if (wrapper.width / wrapper.height >= ratio) {
		return {
			width: wrapper.height * ratio,
			height: wrapper.height
		}
	} else {
		return {
			width: wrapper.width,
			height: wrapper.width / ratio
		};
	}
}