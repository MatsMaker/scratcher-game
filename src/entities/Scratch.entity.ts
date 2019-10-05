import { Container, Texture, Graphics, Sprite, Renderer, interaction, RenderTexture } from 'pixi.js'
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
	renderer?: Renderer
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
	protected fingerActiveArea: Sprite
	protected isClose: boolean

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
		this.isClose = false
	}

	public reset(): void {
		this.dragging = false
		this.scratchEntity.sprite.visible = true
		this.fingerMask = new Graphics()
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

		this.fingerActiveArea.scale.set(nextRatio)
		this.fingerActiveArea.position.set(...this.viewPort.convertPointToSaveArea(position))

		if (this.settings.bgTexture) {
			this.bgSpriteEntity.reRender()
		}
	}

	public setInteractive(value: boolean): void {
		this.fingerActiveArea.interactive = value
		this.fingerActiveArea.buttonMode = value
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

		this.fingerMask = new Graphics()
		this.container.addChild(this.fingerMask)
		this.imageToReveal.mask = this.fingerMask
		this.isClose = true

		this.fingerActiveArea = new Sprite(this.getNewFingerActiveTexture())
		this.container.addChild(this.fingerActiveArea)

		this.initListeners()
	}

	protected initListeners = (): void => {
		const { fingerActiveArea } = this
		fingerActiveArea.on('pointerdown', this.onPointerDown)
		fingerActiveArea.on('pointerup', this.onPointerUp)
		fingerActiveArea.on('pointermove', this.onPointerMove)
		fingerActiveArea.on('mouseover', this.settings.onMouseover)
	}

	protected getNewFingerActiveTexture(): Texture {
		const rectangle = [this.scratchEntity.sprite.texture.width, this.scratchEntity.sprite.texture.height]
		const activeTexture = RenderTexture.create({ width: rectangle[0], height: rectangle[1] })
		return activeTexture
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

			this.fingerMask.beginFill(0xFFFFFF, 1)
			this.fingerMask.drawCircle(scratchPoint[0], scratchPoint[1], 25)
			this.fingerMask.lineStyle(0)
			this.fingerMask.endFill()

			this.onOpening()
		}
	}

}