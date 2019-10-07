import ViewPort from "../core/viewPort/ViewPort"
import { TextStyle, Text } from "pixi.js"

export interface TextEntityOptions {
	name?: string
	text: string
	position: Array<number>
	style: any // style of TextStyle
}


export class TextEntity {

	protected settings: TextEntityOptions
	protected viewPort: ViewPort
	public text: Text

	constructor(viewPort: ViewPort, settings: TextEntityOptions) {
		this.viewPort = viewPort
		this.settings = settings
		this.init()
	}

	public setText(text: string): void {
		this.text.text = text
	}

	public reRender(): void {
		const nextRatio = this.viewPort.getRatioOfSaveArea()
		const { position } = this.settings
		this.text.style.fontSize = Number(this.settings.style.fontSize) * nextRatio
		this.text.position.set(...this.viewPort.convertPointToSaveArea(position))
	}

	protected init(): void {
		this.text = new Text(this.settings.text, new TextStyle(this.settings.style))
		this.text.name = this.settings.name || 'TextEntity'
	}

}