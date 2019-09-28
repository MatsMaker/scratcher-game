import { Application } from 'pixi.js';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import Config from './Config';
import AssetsLoader from './AssetsLoader';
import { StoreType } from '../store';
import { ASSETS_IS_LOADED } from './types';
import { onEvent } from '../utils/store.subscribe';
import { renderBackgroundAction } from '../containers/background/action';
import BackgroundContainer from '../containers/background/Background.container';
import { viewPortResizeAction } from '../store/actions';
import isMobile from 'ismobilejs';
import * as _ from 'lodash';
import { waitReRenderViewPort } from '../utils/viewPort';

@injectable()
class Game {

	protected store: StoreType;
	protected app: Application;
	protected config: Config;
	protected assetsLoader: AssetsLoader;
	protected backgroundContainer: BackgroundContainer;


	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.Application) app: Application,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.BackgroundContainer) backgroundContainer: BackgroundContainer,
	) {
		this.store = store;
		this.config = config;
		this.app = app;
		this.assetsLoader = assetsLoader;
		this.backgroundContainer = backgroundContainer;

		this.initListeners();
	}

	public start(): void {
		this.assetsLoader.load();
		this.init();
	}

	protected initListeners(): void {
		if (isMobile().any) {
			window.addEventListener('orientationchange', () => {
				waitReRenderViewPort(this.onScreenResized)
			});
		} else {
			window.addEventListener('resize', () => {
				waitReRenderViewPort(this.onScreenResized)
			});
		}

		this.store.subscribe(onEvent(ASSETS_IS_LOADED, this.initBackground));
	}

	protected init(): void {
		document.body.appendChild(this.app.view);
	}

	protected initBackground = () => {
		this.store.dispatch(renderBackgroundAction());
	}

	protected onScreenResized = () => {
		this.store.dispatch(viewPortResizeAction());
	}
}

export default Game;
