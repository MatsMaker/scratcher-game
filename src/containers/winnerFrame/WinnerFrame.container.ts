import { injectable, inject } from 'inversify';
import ABaseContainer from '../AContainer/ABaseContainer';
import TYPES from '../../types/MainConfig';
import { StoreType } from '../../store';
import ViewPort from '../../core/viewPort/ViewPort';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import { SpriteEntity } from '../../entities/Sprite.entities';

@injectable()
class WinnerFrameContainer extends ABaseContainer {

	protected name = 'WINNER_FRAME'
	protected frameSprite: SpriteEntity
	protected scratchSprite: SpriteEntity
	protected position: Array<number> = [528, 140];

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort
	) {
		super()
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
			position,
		});
		this.container.addChild(this.frameSprite.sprite);

		const scratchAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame_big');
		const scratchPosition = [
			position[0] + 87,
			position[1] + 228
		];
		this.scratchSprite = new SpriteEntity(this.viewPort, {
			texture: scratchAsset.texture,
			position: scratchPosition,
		});
		this.container.addChild(this.scratchSprite.sprite);

		this.reRender();
	}

	protected reRender = (): void => {
		this.frameSprite.reRender();
		this.scratchSprite.reRender();
	}

}

export default WinnerFrameContainer