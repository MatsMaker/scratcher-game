import { Container, Texture } from 'pixi.js'
import ViewPort from "../core/viewPort/ViewPort";
import { SpriteEntity } from './Sprite.entity';

interface ScratchEntityOptions {
	name: string,
	scratchTexture: Texture
	position: Array<number>
}

export class ScratchEntity {

	public container: Container
	protected settings: ScratchEntityOptions
	protected viewPort: ViewPort
	protected scratchEntity: SpriteEntity

	constructor(viewPort: ViewPort, settings: ScratchEntityOptions) {
		this.viewPort = viewPort
		this.settings = settings
		this.init()
	}

	public reRender = (): void => {
		this.scratchEntity.reRender()
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
			position,
		});
		this.container.addChild(this.scratchEntity.sprite);
	}


}