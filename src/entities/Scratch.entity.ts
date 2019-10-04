import { Container, Texture, Graphics, Sprite } from 'pixi.js'
import * as _ from 'lodash'
import ViewPort from "../core/viewPort/ViewPort"
import { SpriteEntity } from './Sprite.entity'
import { movePoint } from '../utils/math'

interface ScratchEntityOptions {
	id: number
	name: string
	scratchTexture: Texture
	textureToReveal?: Texture
	bgTexture?: Texture
	position: Array<number>
	contentCorrection: Array<number> // TODO just to set align buy center 
	onOpening: Function
	onMouseover: Function
}

export class ScratchEntity {

	public container: Container
	protected settings: ScratchEntityOptions
	protected viewPort: ViewPort
	protected scratchEntity: SpriteEntity
	protected brush: Graphics
	protected dragging: boolean = false
	protected imageToReveal: Sprite
	protected maskSprite: Sprite
	protected isEmpty: boolean = true
	protected bgSpriteEntity?: SpriteEntity

	constructor(viewPort: ViewPort, settings: ScratchEntityOptions) {
		this.viewPort = viewPort
		this.settings = settings
		this.init()
	}

	get id(): number {
		return this.settings.id
	}

	public toOpen = (): void => {
		this.scratchEntity.sprite.visible = false
		this.imageToReveal.visible = !this.isEmpty
	}

	public reset(): void {
		this.dragging = false
		this.scratchEntity.sprite.visible = true
		this.imageToReveal.visible = false
	}

	public setTextureToReveal = (texture: Texture): void => {
		this.settings.textureToReveal = texture
		if (_.isNull(texture)) {
			this.isEmpty = true
			this.imageToReveal.visible = false
		} else {
			this.isEmpty = false
			this.imageToReveal.texture = this.settings.textureToReveal
		}
	}

	public reRender = (): void => {
		this.scratchEntity.reRender()
		const nextRatio = this.viewPort.getRatioOfSaveArea()
		const { position, contentCorrection } = this.settings

		this.imageToReveal.scale.set(nextRatio * contentCorrection[2])
		const nextImagePos = this.viewPort.convertPointToSaveArea(
			movePoint(position, contentCorrection)
		)
		this.imageToReveal.position.set(...nextImagePos)

		if (this.settings.bgTexture) {
			this.bgSpriteEntity.reRender()
		}
	}

	public setInteractive(value: boolean): void {
		this.scratchEntity.sprite.interactive = value
		this.scratchEntity.sprite.buttonMode = value
	}

	protected init = (): void => {

		this.container = new Container()
		this.container.name = this.settings.name || 'Scratch'

		if (this.settings.bgTexture) {
			this.bgSpriteEntity = new SpriteEntity(this.viewPort, {
				name: 'bgTexture',
				texture: this.settings.bgTexture,
				position: this.settings.position,
			})
			this.container.addChild(this.bgSpriteEntity.sprite)
		}

		this.renderContent()
	}

	protected renderContent = (): void => {
		const { position, scratchTexture } = this.settings
		this.scratchEntity = new SpriteEntity(this.viewPort, {
			texture: scratchTexture,
			name: 'scratchEntity',
			position,
		})

		this.container.addChild(this.scratchEntity.sprite)

		this.imageToReveal = new Sprite(this.settings.textureToReveal)
		this.imageToReveal.name = 'imageToReveal'
		this.imageToReveal.anchor.set(0.5, 0.5)
		this.container.addChild(this.imageToReveal)

		this.initListeners()
	}

	protected initListeners = (): void => {
		const { sprite } = this.scratchEntity
		sprite.on('pointerdown', this.onPointerDown)
		sprite.on('pointerup', this.onPointerUp)
		sprite.on('pointermove', this.onPointerMove)
		sprite.on('mouseover', this.settings.onMouseover)
	}

	protected onOpening = (): void => {
		this.settings.onOpening(this.settings.id)
	}

	protected onPointerDown = (): void => {
		this.dragging = true
		this.onPointerMove()
	}

	protected onPointerUp = (): void => {
		this.dragging = false
	}

	protected onPointerMove = (): void => {
		if (this.dragging) {
			this.onOpening()
		}
	}

}