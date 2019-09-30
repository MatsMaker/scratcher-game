import ViewPort from "../core/viewPort/ViewPort"
import { Sprite, Texture, Container } from 'pixi.js'

export interface BarEntityOptions {
	barFrameTexture: Texture
	btnBgTexture: Texture
	name?: string
	position?: Array<number>
}

export class BarEntity {

	public container: Container
	protected frameSprite: Sprite
	protected btnBgSprite: Sprite
	protected viewPort: ViewPort
	protected settings: BarEntityOptions
	protected btnPosition: Array<number> = [25, 235]

	constructor(viewPort: ViewPort, settings: BarEntityOptions) {
		this.settings = settings
		this.viewPort = viewPort
		this.init()
	}
	
	public reRender = (): void => {
		this.frameSprite.position.set(...this.viewPort.convertPointToSaveArea(this.settings.position))
		this.frameSprite.scale.set(this.viewPort.getRatioOfSaveArea())

		const btnNewPosition = [this.settings.position[0] + this.btnPosition[0], this.settings.position[1] + this.btnPosition[1]] 
		this.btnBgSprite.position.set(...this.viewPort.convertPointToSaveArea(btnNewPosition))
		this.btnBgSprite.scale.set(this.viewPort.getRatioOfSaveArea())
	}

	protected init = (): void => {
		this.container = new Container()
		this.container.name = 'Bar'
		this.renderContent()
	}

	protected renderContent = (): void => {
		this.frameSprite = new Sprite(this.settings.barFrameTexture)
		this.btnBgSprite = new Sprite(this.settings.btnBgTexture)
		
		this.container.addChild(this.frameSprite)
		this.container.addChild(this.btnBgSprite)
	}

}