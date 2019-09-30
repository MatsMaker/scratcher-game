import ViewPort from "../core/viewPort/ViewPort"
import { Sprite, Texture, Container, Text, TextStyle } from 'pixi.js'
import { btnLabelStyle } from "./fontStyles"

export interface BarEntityOptions {
	barFrameTexture: Texture
	btnBgTexture: Texture
	name?: string
	position?: Array<number>
}

export class BarEntity {

	public container: Container
	protected viewPort: ViewPort
	protected settings: BarEntityOptions
	protected frameSprite: Sprite
	protected btnBgSprite: Sprite
	protected btnPosition: Array<number> = [25, 235]
	protected btnText: Text
	protected btnLabelPosition: Array<number> = [350, 285]

	constructor(viewPort: ViewPort, settings: BarEntityOptions) {
		this.settings = settings
		this.viewPort = viewPort
		this.init()
	}

	public reRender = (): void => {
		const nextRatio = this.viewPort.getRatioOfSaveArea()
		this.frameSprite.position.set(...this.viewPort.convertPointToSaveArea(this.settings.position))
		this.frameSprite.scale.set(nextRatio)

		const btnNewPosition = [this.settings.position[0] + this.btnPosition[0], this.settings.position[1] + this.btnPosition[1]]
		this.btnBgSprite.position.set(...this.viewPort.convertPointToSaveArea(btnNewPosition))
		this.btnBgSprite.scale.set(nextRatio)

		const btnLabelPosition = [this.settings.position[0] + this.btnLabelPosition[0], this.settings.position[1] + this.btnLabelPosition[1]]
		this.btnText.style.fontSize = Number(btnLabelStyle.fontSize) * nextRatio
		this.btnText.position.set(...this.viewPort.convertPointToSaveArea(btnLabelPosition))
	}

	protected init = (): void => {
		this.container = new Container()
		this.container.name = 'Bar'
		this.renderContent()
	}

	protected renderContent = (): void => {
		this.frameSprite = new Sprite(this.settings.barFrameTexture)
		this.btnBgSprite = new Sprite(this.settings.btnBgTexture)

		this.btnText = new Text('Play for 60', new TextStyle(btnLabelStyle))
		this.btnText.name = 'Play for 60'

		this.container.addChild(this.frameSprite)
		this.container.addChild(this.btnBgSprite)
		this.container.addChild(this.btnText)
	}

}