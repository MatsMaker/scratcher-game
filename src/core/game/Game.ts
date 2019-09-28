import { Application } from 'pixi.js';
import { injectable, inject } from 'inversify';
import * as _ from 'lodash';
import TYPES from '../../types';
import Config from '../config/Config';
import AssetsLoader from '../assetsLoader/AssetsLoader';
import { StoreType } from '../../store';
import { ASSETS_IS_LOADED } from '../assetsLoader/types';
import { onEvent } from '../../utils/store.subscribe';
import StartGameStage from '../../stages/StartGame.stage';
import ViewPort from '../viewPort/ViewPort';

@injectable()
class Game {

	protected store: StoreType;
	protected app: Application;
	protected config: Config;
	protected assetsLoader: AssetsLoader;
	protected startGameStage: StartGameStage;
	protected viewPort: ViewPort;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.Application) app: Application,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort,
		@inject(TYPES.StartGameStage) startGameStage: StartGameStage,
	) {
		this.store = store;
		this.config = config;
		this.app = app;
		this.assetsLoader = assetsLoader;
		this.viewPort = viewPort;
		this.startGameStage = startGameStage;

		this.initListeners();
	}

	protected start = (): void => {
		this.initsStartStage();
	}

	protected initListeners(): void {
		this.store.subscribe(onEvent(ASSETS_IS_LOADED, this.start));
	}

	public launch(): void {
		this.assetsLoader.load();
		document.body.appendChild(this.app.view);
	}

	protected initsStartStage = (): void => {
		this.startGameStage.initScreen();
	}

}

export default Game;