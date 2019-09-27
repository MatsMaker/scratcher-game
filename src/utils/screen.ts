import { ScreenRotation } from "../types/screen";

export function getScreenRotation(): ScreenRotation {
	return (window.innerHeight > window.innerWidth) ? ScreenRotation.PORTRAIT : ScreenRotation.LANDSCAPE
}