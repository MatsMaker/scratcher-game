import ViewPort from "../core/viewPort/ViewPort"
import { Sprite, Texture } from 'pixi.js'

export interface ImageOptions {
	texture: Texture
	position?: Array<number>
	name?: string
	width?: number
	height?: number
}

export class SpriteEntity {

	public sprite: Sprite
	protected texture: Texture
	protected viewPort: ViewPort
	protected position: Array<number>
	protected name: string
	protected width: number
	protected height: number

	constructor(viewPort: ViewPort, options: ImageOptions) {
		this.name = options.name || SpriteEntity.name
		this.texture = options.texture
		this.position = options.position || [0, 0, 0]
		this.viewPort = viewPort
		this.width = options.width
		this.height = options.height
		this.init()
	}

	public reRender = (): void => {
		this.sprite.position.set(...this.viewPort.convertPointToSaveArea(this.position))
		const ration = this.viewPort.getRatioOfSaveArea()
		if (this.width && this.height) {
			this.sprite.width = this.width * ration
			this.sprite.height = this.height * ration
		} else {
			this.sprite.scale.set(ration)
		}

	}

	protected init = (): void => {
		this.sprite = new Sprite(this.texture)
		this.sprite.name = this.name
	}

}