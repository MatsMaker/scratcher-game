import { injectable, inject } from 'inversify';
import { Application } from 'pixi.js';
import TYPES from '../../types/MainConfig';
import ABaseContainer from '../AContainer/ABaseContainer';
import { StoreType } from '../../store';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import ViewPort from '../../core/viewPort/ViewPort';
import { SpriteEntity } from '../../entities/Sprite.entity';
import { ScratchEntity } from '../../entities/Scratch.entity';
import { movePoint } from '../../utils/math';


@injectable()
class ScratchesContainer extends ABaseContainer {

	protected name = 'SCRATCHES'
	protected app: Application
	protected frameSprite: SpriteEntity
	protected scratchEntity: ScratchEntity
	protected position: Array<number> = [528, 140];

	constructor(
		@inject(TYPES.Application) app: Application,
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort
	) {
		super()
		this.app = app
		this.store = store
		this.config = config
		this.assetsLoader = assetsLoader
		this.viewPort = viewPort
		this.init()
	}

	protected renderContent = (): void => {
		const { position } = this;

		const bgAsset = this.assetsLoader.getResource('img/magic_forest_winner_frame');
		this.frameSprite = new SpriteEntity(this.viewPort, {
			texture: bgAsset.texture,
			name: 'ForestWinnerFrame',
			position,
		});
		this.container.addChild(this.frameSprite.sprite);

		const scratchAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame_big')
		const emptyRevealAsset = this.assetsLoader.getResource('img/magic_forest_frame')
		const toRevealAsset = this.assetsLoader.getResource('img/magic_forest_tent')
		this.scratchEntity = new ScratchEntity(this.viewPort, {
			app: this.app,
			name: 'BigScratch',
			scratchTexture: scratchAsset.texture,
			textureToReveal: emptyRevealAsset.texture,
			position: movePoint(position, [87, 228]),
			positionContentCorrection: [50, 70],
		})
		this.scratchEntity.setTextureToReveal(toRevealAsset.texture)
		this.container.addChild(this.scratchEntity.container)

		this.reRender();
	}

	protected reRender = (): void => {
		this.frameSprite.reRender();
		this.scratchEntity.reRender();
	}

}

export default ScratchesContainer