import { injectable, inject } from 'inversify';
import ABaseContainer from '../AContainer/ABaseContainer';
import TYPES from '../../types/MainConfig';
import { StoreType } from '../../store';
import ViewPort from '../../core/viewPort/ViewPort';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import { SpriteEntity } from '../../entities/Sprite.entities';
import { BarEntity } from '../../entities/Bar.entities';

@injectable()
class ModalWindowContainer extends ABaseContainer {

	protected name = 'MODAL_WINDOW'
	protected bgEntity: SpriteEntity
	protected barEntity: BarEntity
	protected position: Array<number> = [0, 0]

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

	protected renderBackground = (): void => {
		const { position } = this;
		const bgAsset = this.assetsLoader.getResource('img/magic_forest_shadow_40_percent');
		this.bgEntity = new SpriteEntity(this.viewPort, {
			texture: bgAsset.texture,
			position,
		});
		this.container.addChild(this.bgEntity.sprite);
	}

	protected renderBar = (): void => {
		const barFrameAsset = this.assetsLoader.getResource('img/magic_forest_frame3')
	
		const btnBgAsset = this.assetsLoader.getResource('img/magic_forest_button')
		const saveAreaSize = this.viewPort.getSaveAreaSize()
		this.barEntity = new BarEntity(this.viewPort, {
			barFrameTexture: barFrameAsset.texture,
			btnBgTexture: btnBgAsset.texture, 
			position: [0, saveAreaSize.height - 520],
		})
		this.container.addChild(this.barEntity.container)
	}

	protected renderContent = (): void => {
		this.renderBackground()
		this.renderBar()
	}

	protected reRender = (): void => {
		this.bgEntity.reRender()
		this.barEntity.reRender()
	}

	protected render = (): void => {
		this.renderContent();
		this.reRender();
		this.container.visible = true; // will be false
	}

}

export default ModalWindowContainer