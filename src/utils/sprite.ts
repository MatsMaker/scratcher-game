import { Sprite } from "pixi.js";
import { OrientationType } from "../types/orientation";
import { AreaSizeType } from "../core/config/types";

export function spriteType(sprite: Sprite): OrientationType {
	return (sprite.width > sprite.height) ? OrientationType.LANDSCAPE : OrientationType.PORTRAIT;
}

export function insideSize(sprite: Sprite, viewArea: AreaSizeType): Array<number> {
	const ratio = sprite.texture.width / sprite.texture.height;

	if (viewArea.width / viewArea.height >= ratio) {
		return [viewArea.height * ratio, viewArea.height]
	} else {
		return [viewArea.width, viewArea.width / ratio];
	}
}