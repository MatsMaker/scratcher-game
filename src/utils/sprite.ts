import { Sprite } from "pixi.js";
import { ViewPortState } from "../store/types";
import { ViewPortRotation } from "../types/viewPort";

export function spriteType(sprite: Sprite): ViewPortRotation {
	return (sprite.width > sprite.height) ? ViewPortRotation.LANDSCAPE : ViewPortRotation.PORTRAIT;
}

export function insideSize(sprite: Sprite, viewPort: ViewPortState): Array<number> {
	const spaceWidth = viewPort.width - sprite.width;
	const spaceHeight = viewPort.height - sprite.height;
	// console.log('ration: ', spaceWidth, spaceHeight, ' viewPort: ', viewPort.width, viewPort.height, ' sprite: ', sprite.width, sprite.height);
	if (
		spaceWidth > 0 && spaceHeight > 0
	) {
		// console.log('extend');
		if (spaceWidth < spaceHeight) {
			// console.log('by height');
			const ratio = viewPort.height / sprite.height;
			return [ratio * sprite.width, viewPort.height];
		}
		if (spaceWidth > spaceHeight) {
			// console.log('by width');
			const ratio = viewPort.width / sprite.width;
			return [viewPort.width, sprite.width * ratio];
		}
	}
	if (
		spaceWidth < 1 || spaceHeight < 1
	) {
		// console.log('compress');
		if (spaceWidth > spaceHeight) {
			// console.log('by height');
			const ratio = viewPort.height / sprite.height;
			return [(ratio % 1) * sprite.width, viewPort.height];
		}
		if (spaceWidth < spaceHeight) {
			// console.log('by width');
			const ratio = viewPort.width / sprite.width;
			return [sprite.width, sprite.height * (ratio % 1)];
		}
	}
	throw 'Need more case for scale image';
}