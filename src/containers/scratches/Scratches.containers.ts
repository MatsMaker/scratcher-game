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
import { cleanScratcherAction } from './actions';
import ScratchGroupEntity from '../../entities/ScratchGroup.entity';


@injectable()
class ScratchesContainer extends ABaseContainer {

	protected name = 'SCRATCHES'
	protected app: Application
	protected frameSprite: SpriteEntity
	protected scratchEntity: ScratchEntity
	protected scratchGroupEntity: ScratchGroupEntity
	protected position: Array<number> = [0, 0];

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
			position: [528, 140],
		});
		this.container.addChild(this.frameSprite.sprite);

		const scratchAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame_big')
		const toRevealAsset = this.assetsLoader.getResource('img/magic_forest_tent')
		const bgRevealAsset = this.assetsLoader.getResource('img/magic_forest_frame')
		this.scratchEntity = new ScratchEntity(this.viewPort, {
			app: this.app,
			name: 'BigScratch',
			scratchTexture: scratchAsset.texture,
			textureToReveal: bgRevealAsset.texture,
			position: movePoint(position, [615, 368]),
			positionContentCorrection: [50, 70],
			onClear: this.onClearBigScratcher,
		})
		this.scratchEntity.setTextureToReveal(toRevealAsset.texture)
		this.container.addChild(this.scratchEntity.container)
		
		const scratchSmallAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame')
		this.scratchGroupEntity = new ScratchGroupEntity(this.viewPort, {
			app: this.app,
			name: 'SmallScratchesGroup',
			scratchTexture: scratchSmallAsset.texture,
			textureToReveal: bgRevealAsset.texture,
			position: movePoint(position, [75, 1225]),
			bgTexture: bgRevealAsset.texture,
		})
		this.container.addChild(this.scratchGroupEntity.container)

		this.reRender()
	}

	protected reRender = (): void => {
		this.frameSprite.reRender()
		this.scratchEntity.reRender()
		this.scratchGroupEntity.reRender()
	}

	protected onClearBigScratcher = (): void => {
		this.store.dispatch(cleanScratcherAction('bigScratcher'))
	}

}

export default ScratchesContainer