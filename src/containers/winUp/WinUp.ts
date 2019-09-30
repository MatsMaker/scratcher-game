import { injectable, inject } from 'inversify';
import { Sprite } from 'pixi.js';
import ABaseContainer from '../AContainer/ABaseContainer';
import TYPES from '../../types/MainConfig';
import { StoreType } from '../../store';
import ViewPort from '../../core/viewPort/ViewPort';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';

@injectable()
class WinUpContainer extends ABaseContainer {

	protected name = 'WIN_UP'
	protected messageSprite: Sprite;
	protected position: Array<number> = [150, 30];

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
		const bgAsset = this.assetsLoader.getResource('img/magic_forest_win_up_to_100');
		this.messageSprite = new Sprite(bgAsset.texture);
		this.container.addChild(this.messageSprite);
		this.reRender();
	}

	protected reRender = (): void => {
		this.messageSprite.position.set(
			...this.viewPort.convertPointToSaveArea(this.position)
		)
		this.messageSprite.scale.set(
			this.viewPort.getRatioOfSaveArea()
		)
	}

}

export default WinUpContainer