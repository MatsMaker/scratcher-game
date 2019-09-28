import { Application, Container, Sprite } from 'pixi.js';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import Config from '../../core/Config';
import AssetsLoader from '../../core/AssetsLoader';
import { StoreType } from 'store';
import { onEvent } from '../../utils/store.subscribe';
import { RENDER_BACKGROUND, RE_RENDER_BACKGROUND } from './types';
import { insideSize } from '../../utils/sprite';
import { VIEW_PORT_RESIZE_ACTION } from '../../store/types';
import { reRenderBackgroundAction } from './action';

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
		this.store.subscribe(onEvent(RENDER_BACKGROUND,
			() => this.app.ticker.addOnce(this.render)));
		this.store.subscribe(onEvent(RE_RENDER_BACKGROUND,
			() => this.app.ticker.addOnce(this.reRender)));
		this.store.subscribe(onEvent(VIEW_PORT_RESIZE_ACTION,
			() => this.store.dispatch(reRenderBackgroundAction())));
	}

	protected renderContainer = () => {
		const bgAsset = this.assetsLoader.getResource('magic_forest_bg.jpg');
		this.baseSprite = new Sprite(bgAsset.texture);
		this.baseSprite.anchor.set(0.5, 0.5);
		this.reRender();
		this.container.addChild(this.baseSprite);
	}

	protected render = () => {
		this.renderContainer();
		this.app.stage.addChild(this.container);
	}

	protected reRender = () => {
		const { viewPort } = this.store.getState();
		const nextSize = insideSize(this.baseSprite, viewPort);
		this.baseSprite.width = nextSize[0];
		this.baseSprite.height = nextSize[1];
		this.baseSprite.position.set(viewPort.centerWidth, viewPort.centerHeight);
	}

}

export default BackgroundContainer;
