import { injectable, inject } from 'inversify';
import * as _ from 'lodash';
import TYPES from '../types/MainConfig';
import Config from '../core/config/Config';
import AssetsLoader from '../core/assetsLoader/AssetsLoader';
import { StoreType } from '../store';
import { ASSETS_IS_LOADED } from '../core/assetsLoader/types';
import { onEvent } from '../utils/store.subscribe';
import StartGameStage from '../stages/StartGame.stage';
import ViewPort from '../core/viewPort/ViewPort';

@injectable()
class Game {

	protected store: StoreType;
	protected config: Config;
	protected assetsLoader: AssetsLoader;
	protected startGameStage: StartGameStage;
	protected viewPort: ViewPort;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort,
		@inject(TYPES.StartGameStage) startGameStage: StartGameStage,
	) {
		this.store = store;
		this.config = config;
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
	}

	protected initsStartStage = (): void => {
		this.startGameStage.initScreen();
	}

}

export default Game;