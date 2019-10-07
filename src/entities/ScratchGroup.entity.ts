import { ScratchEntity } from "./Scratch.entity"
import { Container, Texture } from "pixi.js"
import ViewPort from "../core/viewPort/ViewPort"
import * as _ from 'lodash'
import { movePoint } from "../utils/math"

interface ScratchGroupEntityOptions {
	startId: number
	name: string
	scratchTexture: Texture
	bgTexture: Texture
	position: Array<number>
	onOpening: Function
	onMouseover: Function
	contentCorrection: Array<number>
	textureToReveal?: Texture
}

export default class ScratchGroupEntity {

	public container: Container
	protected scratchGroup: Array<ScratchEntity> = []
	protected viewPort: ViewPort
	protected settings: ScratchGroupEntityOptions

	constructor(viewPort: ViewPort, settings: ScratchGroupEntityOptions) {
		this.viewPort = viewPort
		this.settings = settings
		this.init()
	}

	public toClearAll(): void {
		_.forEach(this.scratchGroup, (s: ScratchEntity) => {
			s.clearScratch()
		})
	}

	public toOpen = (id: number): void => {
		const entityIndex = this.scratchGroup.findIndex((s: ScratchEntity) => s.id === id)
		this.scratchGroup[entityIndex].toOpen()
	}

	public resetAll(): void {
		_.forEach(this.scratchGroup, (s: ScratchEntity) => {
			s.reset()
		})
	}

	public setTextureToReveal(id: number, texture: Texture): void {
		const entityIndex = this.scratchGroup.findIndex((s: ScratchEntity) => s.id === id)
		this.scratchGroup[entityIndex].setTextureToReveal(texture)
	}

	public reRender = (): void => {
		_.forEach(this.scratchGroup, (scratch: ScratchEntity) => {
			scratch.reRender()
		})
	}

	public setInteractive(value: boolean): void {
		_.forEach(this.scratchGroup, (s: ScratchEntity) => {
			s.setInteractive(value)
		})
	}

	protected init = (): void => {
		this.container = new Container()
		this.container.name = this.settings.name || 'ScratchGroupEntity'
		this.renderContent()
	}

	protected renderContent = (): void => {
		const { scratchTexture, position, textureToReveal, bgTexture } = this.settings
		const scratchSettings = {
			name: 'BigScratch',
			scratchTexture,
			textureToReveal,
			position,
			contentCorrection: this.settings.contentCorrection,
			onOpening: this.onOpening,
			onMouseover: this.settings.onMouseover,
			bgTexture
		}
		const marginRow = 335
		const marginClm = 335
		let id = this.settings.startId
		_.times(3).forEach((row: number) => {
			_.times(2).forEach((clm: number) => {
				const scratch = new ScratchEntity(this.viewPort, {
					...scratchSettings,
					id,
					name: `SmallScratch-${row}-${clm}`,
					position: movePoint(position, [row * marginRow, clm * marginClm]),
				})
				this.scratchGroup.push(scratch)
				this.container.addChild(scratch.container)
				id++
			})
		})
	}

	protected onOpening = (id: number, entity: ScratchEntity): void => {
		const { onOpening } = this.settings
		onOpening(id, entity)
	}

}
