import { injectable, inject } from 'inversify';
import { Sprite } from 'pixi.js';
import ABaseContainer from '../AContainer/ABaseContainer';
import TYPES from '../../types/MainConfig';
import { StoreType } from '../../store';
import ViewPort from '../../core/viewPort/ViewPort';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';

@injectable()
class WinnerFrameContainer extends ABaseContainer {

	protected name = 'WINNER_FRAME'
	protected frameSprite: Sprite;
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
		const bgAsset = this.assetsLoader.getResource('img/magic_forest_winner_frame');
		this.frameSprite = new Sprite(bgAsset.texture);
		this.container.addChild(this.frameSprite);
		this.reRender();
	}

	protected reRender = (): void => {
		this.frameSprite.position.set(
			...this.viewPort.convertPointToSaveArea(this.position)
		)
		this.frameSprite.scale.set(
			this.viewPort.getRatioOfSaveArea()
		)
	}

}

export default WinnerFrameContainer