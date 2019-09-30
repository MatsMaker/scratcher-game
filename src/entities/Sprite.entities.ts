import ViewPort from "../core/viewPort/ViewPort"
import { Sprite, Texture } from 'pixi.js'

export interface ImageOptions {
	texture: Texture
	position?: Array<number>
}

export class SpriteEntity {

	protected texture: Texture
	protected viewPort: ViewPort
	protected position: Array<number>
	public sprite: Sprite

	constructor(viewPort: ViewPort, options: ImageOptions) {
		this.texture = options.texture
		this.position = options.position || [0.0]
		this.viewPort = viewPort
		this.init()
	}

	public reRender = (): void => {
		this.sprite.position.set(...this.viewPort.convertPointToSaveArea(this.position))
		this.sprite.scale.set(this.viewPort.getRatioOfSaveArea())
	}

	protected init = (): void => {
		this.sprite = new Sprite(this.texture);
	}

}