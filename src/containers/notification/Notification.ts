import { injectable, inject } from 'inversify';
import ABaseContainer from '../AContainer/ABaseContainer';
import TYPES from '../../types/MainConfig';
import { StoreType } from '../../store';
import ViewPort from '../../core/viewPort/ViewPort';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import { SpriteEntity } from '../../entities/Sprite.entities';

@injectable()
class NotificationContainer extends ABaseContainer {

	protected name = 'NOTIFICATION'
	protected bgSprite: SpriteEntity
	protected position: Array<number> = [45, 1040];

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
		const bgAsset = this.assetsLoader.getResource('img/magic_forest_frame_for_text');
		this.bgSprite = new SpriteEntity(this.viewPort, {
			texture: bgAsset.texture,
			position,
		});
		this.container.addChild(this.bgSprite.sprite);
	}

	protected reRender = (): void => {
		this.bgSprite.reRender();
	}

}

export default NotificationContainer