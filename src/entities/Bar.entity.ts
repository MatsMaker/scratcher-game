import ViewPort from "../core/viewPort/ViewPort"
import { Sprite, Texture, Container, Text, TextStyle } from 'pixi.js'
import { btnLabelStyle, btnOrangeStyle } from "./fontStyles"
import { SpriteEntity } from "./Sprite.entity"

export enum barEventType {
	onPlay = 'onPlay',
	howToPlay = 'howToPlay',
}
export interface BarEntityOptions {
	barFrameTexture: Texture
	btnBgTexture: Texture
	onClick?: Function
	name?: string
	position?: Array<number>
}

export class BarEntity {

	public container: Container
	protected viewPort: ViewPort
	protected settings: BarEntityOptions
	protected frameSprite: SpriteEntity
	protected btnBgPlaySprite: Sprite
	protected btnPlayPosition: Array<number> = [25, 235]
	protected btnPlayText: Text
	protected btnPlayLabelPosition: Array<number> = [350, 285]
	protected linkRulesText: Text
	protected linkRulesLabelPosition: Array<number> = [430, 115]

	constructor(viewPort: ViewPort, settings: BarEntityOptions) {
		this.settings = settings
		this.viewPort = viewPort
		this.init()
	}

	public reRender = (): void => {
		const nextRatio = this.viewPort.getRatioOfSaveArea()
		this.frameSprite.reRender()

		this.btnBgPlaySprite.position.set(...this.viewPort.convertPointToSaveArea(this.settings.position , this.btnPlayPosition))
		this.btnBgPlaySprite.scale.set(nextRatio)

		this.btnPlayText.style.fontSize = Number(btnLabelStyle.fontSize) * nextRatio
		this.btnPlayText.position.set(...this.viewPort.convertPointToSaveArea(this.settings.position, this.btnPlayLabelPosition))

		this.linkRulesText.style.fontSize = Number(btnLabelStyle.fontSize) * nextRatio
		this.linkRulesText.position.set(...this.viewPort.convertPointToSaveArea(this.settings.position, this.linkRulesLabelPosition))
	}

	public onClick = (eventType: string, payload?: any): void => {
		this.settings.onClick && this.settings.onClick(eventType, payload)
	}

	protected init = (): void => {
		this.container = new Container()
		this.container.name = 'Bar'
		this.renderContent()
	}

	protected initListeners = (): void => {
		this.btnBgPlaySprite.on('pointerdown', (e: any) => {
			this.onClick(barEventType.onPlay, e)
		})

		this.linkRulesText.on('pointerdown', (e: any) => {
			this.onClick(barEventType.howToPlay, e)
		})
	} 

	protected renderContent = (): void => {
		this.frameSprite = new SpriteEntity(this.viewPort, {
			texture: this.settings.barFrameTexture,
			position: this.settings.position,
		})
		this.btnBgPlaySprite = new Sprite(this.settings.btnBgTexture)
		this.btnBgPlaySprite.interactive = true
		this.btnBgPlaySprite.buttonMode = true

		this.btnPlayText = new Text('Play for 60', new TextStyle(btnLabelStyle))
		this.btnPlayText.name = 'Play for 60'

		this.linkRulesText = new Text('How To Play', new TextStyle(btnOrangeStyle))
		this.linkRulesText.name = 'How To Play'
		this.linkRulesText.interactive = true
		this.linkRulesText.buttonMode = true

		this.container.addChild(this.frameSprite.sprite)
		this.container.addChild(this.linkRulesText)
		this.container.addChild(this.btnBgPlaySprite)
		this.container.addChild(this.btnPlayText)

		this.initListeners()
	}

}