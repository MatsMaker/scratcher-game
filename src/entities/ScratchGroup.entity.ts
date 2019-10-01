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

	protected init = (): void => {
		this.container = new Container()
		this.container.name = this.settings.name || 'ScratchGroupEntity'
		this.renderContent()
	}

	protected renderContent = (): void => {
		const { scratchTexture, position, textureToReveal } = this.settings
		const scratchSettings = {
			app: this.settings.app,
			name: 'BigScratch',
			scratchTexture,
			textureToReveal,
			position,
			positionContentCorrection: [50, 70],
			onClear: this.onOnceClear
		}
		_.times(2).forEach((row: number) => {
			_.times(3).forEach((clm: number) => {
				const scratch = new ScratchEntity(this.viewPort, {
					...scratchSettings,
					name: `SmallScratch-${row}-${clm}`,
					position: movePoint(position, [87 + row * 50, 228 + clm * 50])
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
