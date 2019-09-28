import { Container, Sprite } from 'pixi.js';
import { injectable, inject } from 'inversify';
import TYPES from '../../types';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import { StoreType } from 'store';
import { onEvent } from '../../utils/store.subscribe';
import { RENDER_BACKGROUND, RE_RENDER_BACKGROUND } from './types';
import { insideSize } from '../../utils/sprite';
import { VIEW_PORT_RESIZE_ACTION } from '../../core/viewPort/types';
import { reRenderBackgroundAction } from './action';
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

	protected init = (): void => {
		this.initListeners();

		this.container = new Container();
		this.container.name = 'background';
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(RENDER_BACKGROUND,
			() => this.viewPort.ticker.addOnce(this.render)));
		this.store.subscribe(onEvent(RE_RENDER_BACKGROUND,
			() => this.viewPort.ticker.addOnce(this.reRender)));
		this.store.subscribe(onEvent(VIEW_PORT_RESIZE_ACTION,
			() => this.store.dispatch(reRenderBackgroundAction())));
	}

	protected renderContainer = () => {
		const bgAsset = this.assetsLoader.getResource('img/magic_forest_bg');
		this.baseSprite = new Sprite(bgAsset.texture);
		this.baseSprite.anchor.set(0.5, 0.5);
		this.container.addChild(this.baseSprite);
		this.reRender();
	}

	protected render = () => {
		this.renderContainer();
		console.log('bg');
		
		this.viewPort.stage.addChild(this.container);
		this.viewPort.updateLayersOrder();
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
