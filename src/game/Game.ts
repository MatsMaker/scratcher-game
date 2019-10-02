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
import { endRound, playAction } from './actions';
import { initStartGameAction } from '../stages/action';
import { INITIATED_START_GAME_STAGE } from '../stages/types';
import { showPlayBarAction } from '../containers/modalWindow/actions';
import { PLAY_BAR_HIDDEN } from '../containers/modalWindow/types';
import { END_ROUND } from './types';

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

	protected initStage = (): void => {
		this.store.dispatch(initStartGameAction())
	}

	protected initListeners(): void {
		const { subscribe } = this.store
		subscribe(onEvent(ASSETS_IS_LOADED, this.initStage))
		subscribe(onEvent(OPEN_SCRATCH, this.openScratch))
		subscribe(onEvent(INITIATED_START_GAME_STAGE, this.toPrepareGame.bind(this)))
		subscribe(onEvent(PLAY_BAR_HIDDEN, this.toPlayGame.bind(this)))
		subscribe(onEvent(END_ROUND, this.toPrepareGame.bind(this)))
	}

	public launch(): void {
		this.assetsLoader.load()
	}

	protected toPlayGame(): void {
		this.store.dispatch(playAction())
	}

	protected openScratch = (): void => {
		const { scratchesReducer } = this.store.getState()
		if (scratchesReducer.allIsOpen) {
			this.store.dispatch(endRound())
		}
	}

	protected toPrepareGame(): void {
		this.store.dispatch(showPlayBarAction())
	}

}

export default Game;
