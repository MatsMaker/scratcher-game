import { Application, Container, Sprite } from 'pixi.js';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import Config from '../../core/Config';
import AssetsLoader from '../../core/AssetsLoader';
import { StoreType } from 'store';
import { onEvent } from '../../utils/store.subscribe';
import { RENDER_BACKGROUND } from './types';

@injectable()
class BackgroundContainer {

	protected store: StoreType;
	protected app: Application;
	protected config: Config;
	protected assetsLoader: AssetsLoader;
	protected container: Container;
	protected baseSprite: Sprite;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.Application) app: Application,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
	) {
		this.store = store;
		this.config = config;
		this.app = app;
		this.assetsLoader = assetsLoader;
		this.init();
	}

	protected init() {
		this.initListeners();

		this.container = new Container();
		this.container.name = 'background';
	}

	protected initListeners(): void {
		this.store.subscribe(onEvent(RENDER_BACKGROUND, this.render))
	}

	protected renderContainer = () => {
		const bgAsset = this.assetsLoader.getResource('magic_forest_bg.jpg');
		this.baseSprite = new Sprite(bgAsset.texture);
		this.baseSprite.anchor.set(0.5, 0.5);
		this.container.addChild(this.baseSprite);
	}

	protected render = () => {
		this.renderContainer();
		this.app.stage.addChild(this.container);
	}

}

export default BackgroundContainer;
