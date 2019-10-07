import { Container, Texture, Graphics, Sprite, Renderer, interaction } from 'pixi.js'
import * as _ from 'lodash'
import ViewPort from "../core/viewPort/ViewPort"
import { SpriteEntity } from './Sprite.entity'
import { movePoint } from '../utils/math'

interface ScratchEntityOptions {
	id: number
	name: string
	scratchTexture: Texture
	textureToReveal?: Texture
	bgTexture: Texture
	bgCorrect?: Array<number>
	position: Array<number>
	contentCorrection: Array<number> // TODO just to set align buy center 
	onOpening: Function
	onMouseover: Function
	renderer?: Renderer
	fingerSize?: number
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
	protected fingerMask: Graphics
	protected invertFingerMask: Graphics
	protected isClose: boolean
	protected fingerSize: number

	constructor(viewPort: ViewPort, settings: ScratchEntityOptions) {
		this.viewPort = viewPort
		this.settings = settings
		this.fingerSize = settings.fingerSize || 80
		this.init()
	}

	get id(): number {
		return this.settings.id
	}


	public clearScratch(): void {
		const rectangle = [this.scratchEntity.sprite.texture.width, this.scratchEntity.sprite.texture.height]
		this.fingerMask.beginFill(0x000000)
		this.fingerMask.drawRect(0, 0, rectangle[0], rectangle[1])
		this.fingerMask.lineStyle(0)
		this.fingerMask.endFill()
		this.scratchEntity.sprite.visible = false
	}


	public toOpen = (): void => {
		this.imageToReveal.visible = !this.isEmpty
		this.isClose = false
	}

	public reset(): void {
		this.dragging = false
		this.scratchEntity.sprite.visible = true
		this.fingerMask.clear()
		this.isClose = true
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

		this.fingerMask.scale.set(nextRatio)
		this.fingerMask.position.set(...this.viewPort.convertPointToSaveArea(position))

		this.bgSpriteEntity.reRender()
	}

	public setInteractive(value: boolean): void {
		this.scratchEntity.sprite.interactive = value
		this.scratchEntity.sprite.buttonMode = value
	}

	protected init = (): void => {

		this.container = new Container()
		this.container.name = this.settings.name || 'Scratch'

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

		this.bgSpriteEntity = new SpriteEntity(this.viewPort, {
			name: 'bgTexture',
			texture: this.settings.bgTexture,
			width: this.settings.scratchTexture.width,
			height: this.settings.scratchTexture.height,
			position: movePoint(this.settings.position, this.settings.bgCorrect || [0, 0]),
		})
		this.container.addChild(this.bgSpriteEntity.sprite)

		this.imageToReveal = new Sprite(this.settings.textureToReveal || this.settings.scratchTexture)
		this.imageToReveal.name = 'imageToReveal'
		this.imageToReveal.anchor.set(0.5, 0.5)
		this.container.addChild(this.imageToReveal)

		this.fingerMask = new Graphics()
		this.container.addChild(this.fingerMask)
		this.isClose = true

		this.bgSpriteEntity.sprite.mask = this.fingerMask
		this.imageToReveal.mask = this.fingerMask

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

	protected onPointerDown = (event: interaction.InteractionEvent): void => {
		this.dragging = true
		this.onPointerMove(event)
	}

	protected onPointerUp = (): void => {
		this.dragging = false
	}

	protected onPointerMove = (event: interaction.InteractionEvent): void => {
		if (this.dragging) {

			const { position } = this.settings
			const { global } = event.data
			const scratchPoint = this.viewPort.globalPointToSaveArea([global.x, global.y], position)

			this.fingerMask.beginFill(0x000000)
			this.fingerMask.drawCircle(scratchPoint[0], scratchPoint[1], this.fingerSize)
			this.fingerMask.lineStyle(0)
			this.fingerMask.endFill()

			// console.log(this.fingerMask.geometry['dirty'])
			// console.log(this.fingerMask.geometry)

			if (this.isClose) {// TODO this check is trial
				this.onOpening()
			}

		}
	}

}