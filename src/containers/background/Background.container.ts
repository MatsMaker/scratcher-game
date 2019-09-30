import { Container, Sprite } from 'pixi.js';
import { injectable, inject } from 'inversify';
import TYPES from '../../types/MainConfig';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import { StoreType } from 'store';
import { onEvent } from '../../utils/store.subscribe';
import { RENDER_BACKGROUND, RE_RENDER_BACKGROUND } from './types';
import ViewPort from '../../core/viewPort/ViewPort';

@injectable()
class BackgroundContainer {

	protected store: StoreType;
	protected config: Config;
	protected assetsLoader: AssetsLoader;
	protected viewPort: ViewPort;
	protected container: Container;
	protected baseSprite: Sprite;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort
	) {
		this.store = store;
		this.config = config;
		this.assetsLoader = assetsLoader;
		this.viewPort = viewPort;
		this.init();
	}

	get view(): Container {
		return this.container;
	}

	protected init = (): void => {
		this.initContainer();
		this.initListeners();
	}

	protected initContainer = () => {
		this.container = new Container();
		this.container.visible = false;
		this.container.name = 'background';
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(RENDER_BACKGROUND,
			() => this.viewPort.ticker.addOnce(this.render)));
		this.store.subscribe(onEvent(RE_RENDER_BACKGROUND,
			() => this.viewPort.ticker.addOnce(this.reRender)));
	}

	protected renderContent = () => {
		const bgAsset = this.assetsLoader.getResource('img/magic_forest_bg');
		this.baseSprite = new Sprite(bgAsset.texture);
		this.container.addChild(this.baseSprite);
		this.reRender();
	}

	protected render = () => {
		this.renderContent();
		this.container.visible = true;
	}

	protected reRender = () => {
		const { viewPort } = this.store.getState();
		this.baseSprite.position.set(
			...this.viewPort.convertPointToSaveArea([0, 0]),
		);
		this.baseSprite.scale.set(viewPort.saveRatio);
	}

}

export default BackgroundContainer;
