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
import { OPEN_SCRATCH } from '../containers/scratches/types';
import { endRound } from './actions';

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
		this.store.subscribe(onEvent(ASSETS_IS_LOADED, this.start))
		this.store.subscribe(onEvent(OPEN_SCRATCH, this.openScratch))
	}

	public launch(): void {
		this.assetsLoader.load();
	}

	protected initsStartStage = (): void => {
		this.startGameStage.initScreen();
	}

	protected openScratch = (): void => {
		const { scratchesReducer } = this.store.getState()
		if (scratchesReducer.allIsOpen) {
			this.store.dispatch(endRound())
		}
	}

}

export default Game;
