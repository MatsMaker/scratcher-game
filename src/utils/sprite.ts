import { Sprite } from "pixi.js";
import { ViewPortState } from "../core/viewPort/types";
import { OrientationType } from "../types/orientation";

export function spriteType(sprite: Sprite): OrientationType {
	return (sprite.width > sprite.height) ? OrientationType.LANDSCAPE : OrientationType.PORTRAIT;
}

export function insideSize(sprite: Sprite, viewPort: ViewPortState): Array<number> {
	const spaceWidth = viewPort.width - sprite.texture.width;
	const spaceHeight = viewPort.height - sprite.texture.height;
	console.log('space: ', spaceWidth, spaceHeight, ' viewPort: ', viewPort.width, viewPort.height, ' sprite: ', sprite.texture.width, sprite.texture.height);
	if (
		spaceWidth > 0 && spaceHeight > 0
	) {
		console.log('extend');
		if (spaceWidth < spaceHeight) {
			console.log('by height');
			const ratio = viewPort.height / sprite.texture.height;
			return [ratio * sprite.texture.width, viewPort.height];
		}
		if (spaceWidth > spaceHeight) {
			console.log('by width');
			const ratio = viewPort.width / sprite.texture.width;
			return [viewPort.width, sprite.texture.width * ratio];
		}
	}
	if (
		spaceWidth < 1 || spaceHeight < 1
	) {
		console.log('compress');
		if (spaceWidth > spaceHeight) {
			console.log('by height');
			const ratio = viewPort.height / sprite.height;
			return [(ratio % 1) * sprite.texture.width, viewPort.height];
		}
		if (spaceWidth < spaceHeight) {
			console.log('by width');
			const ratio = viewPort.width / sprite.width;
			return [viewPort.width, sprite.texture.height * (ratio % 1)];
		}
	}
	throw 'Need more case for scale image';
}