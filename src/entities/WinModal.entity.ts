import { Texture, Container } from "pixi.js"
import ViewPort from "../core/viewPort/ViewPort"
import { WinType } from "../game/types"
import { SpriteEntity } from "./Sprite.entity"
import { redWinStyle, resultWinStyle } from "./fontStyles"
import { TextEntity } from "./Text.entity"
import { movePoint } from "../utils/math"

export interface WinModalEntityOptions {
	bgFrame: Texture
	name?: string
	position?: Array<number>
	labelCorrect: Array<number>
	coinTexture: Texture
}

export class WinModalEntity {

	public container: Container
	protected viewPort: ViewPort
	protected settings: WinModalEntityOptions
	protected win: WinType
	protected bgFrame: SpriteEntity
	protected messageEntity: TextEntity
	protected resultCoinsEntity: TextEntity
	protected coinIco: SpriteEntity

	constructor(viewPort: ViewPort, settings: WinModalEntityOptions) {
		this.settings = settings
		this.viewPort = viewPort
		this.init()
	}

	public setWinValue(win: WinType): void {
		this.win = win
		this.resultCoinsEntity.setText(String(this.win.coin))
	}

	public reRender = (): void => {
		this.bgFrame.reRender()
		this.messageEntity.reRender()
		this.resultCoinsEntity.reRender()
		this.coinIco.reRender()
	}

	public setVisible(value: boolean) {
		this.container.visible = value
	}

	protected init(): void {
		this.container = new Container()
		this.container.name = this.settings.name || 'WinModalEntity'

		this.bgFrame = new SpriteEntity(this.viewPort, {
			texture: this.settings.bgFrame,
			position: this.settings.position,
		})
		this.container.addChild(this.bgFrame.sprite)

		const { position, labelCorrect } = this.settings
		const messagePosition = movePoint(position, labelCorrect)
		this.messageEntity = new TextEntity(this.viewPort, {
			name: 'message',
			position: messagePosition,
			text: 'YOU WIN',
			style: redWinStyle
		})
		this.messageEntity.text.anchor.set(0.5, 0.5)
		this.container.addChild(this.messageEntity.text)

		const resultPosition = movePoint(messagePosition, [0, 120])
		this.resultCoinsEntity = new TextEntity(this.viewPort, {
			name: 'roundResult',
			position: resultPosition,
			text: '',
			style: resultWinStyle
		})
		this.resultCoinsEntity.text.anchor.set(0.5, 0.5)
		this.container.addChild(this.resultCoinsEntity.text)

		this.coinIco = new SpriteEntity(this.viewPort, {
			name: 'coinIco',
			texture: this.settings.coinTexture,
			position: movePoint(resultPosition, [130, 0])
		})
		this.coinIco.sprite.anchor.set(0.5, 0.5)
		this.container.addChild(this.coinIco.sprite)
	}

}