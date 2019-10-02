import { ScratchEntity } from "./Scratch.entity"
import { Container, Texture, Application } from "pixi.js"
import ViewPort from "../core/viewPort/ViewPort"
import * as _ from 'lodash'
import { movePoint } from "../utils/math"

interface ScratchGroupEntityOptions {
	name: string
	app: Application
	scratchTexture: Texture
	textureToReveal?: Texture
	bgTexture: Texture
	position: Array<number>
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

	public reRender = (): void => {
		_.forEach(this.scratchGroup, (scratch: ScratchEntity) => {
			scratch.reRender()
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
			app: this.settings.app,
			name: 'BigScratch',
			scratchTexture,
			textureToReveal,
			position,
			positionContentCorrection: [0, 0],
			onClear: this.onOnceClear
		}
		const marginRow = 335
		const marginClm = 335
		_.times(3).forEach((row: number) => {
			_.times(2).forEach((clm: number) => {
				const scratch = new ScratchEntity(this.viewPort, {
					...scratchSettings,
					name: `SmallScratch-${row}-${clm}`,
					position: movePoint(position, [row * marginRow, clm * marginClm]),
					bgTexture,
				})
				this.scratchGroup.push(scratch)
				this.container.addChild(scratch.container)
			})
		})
	}

	protected onOnceClear = (): void => {
		console.log('!!!!!!!!!!!!!!')
	}

}
