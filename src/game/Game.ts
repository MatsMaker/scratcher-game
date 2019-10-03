import { injectable, inject } from 'inversify';
import * as _ from 'lodash';
import TYPES from '../types/MainConfig';
import Config from '../core/config/Config';
import AssetsLoader from '../core/assetsLoader/AssetsLoader';
import { StoreType } from '../store';
import { ASSETS_IS_LOADED } from '../core/assetsLoader/types';
import { onEvent, onClearEvent } from '../utils/store.subscribe';
import StartGameStage from '../stages/StartGame.stage';
import ViewPort from '../core/viewPort/ViewPort';
import { OPEN_SCRATCH, BonusType, SCRATCHES_RESTORED } from '../containers/scratches/types';
import { endRound, playAction, getBonusAction } from './actions';
import { initStartGameAction } from '../stages/action';
import { INITIATED_START_GAME_STAGE } from '../stages/types';
import { showPlayBarAction } from '../containers/modalWindow/actions';
import { PLAY_BAR_HIDDEN } from '../containers/modalWindow/types';
import { END_ROUND, GET_BONUS } from './types'
import { resetScratchesAction } from '../containers/scratches/actions';

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

	public launch(): void {
		this.assetsLoader.load()
	}

	protected initListeners(): void {
		const { subscribe } = this.store
		subscribe(onEvent(ASSETS_IS_LOADED, this.initStage))
		subscribe(onEvent(INITIATED_START_GAME_STAGE, this.toResetScratches.bind(this)))
		subscribe(onEvent(PLAY_BAR_HIDDEN, this.toResetScratches.bind(this)))
		subscribe(onEvent(SCRATCHES_RESTORED, this.toPlayGame.bind(this)))
		subscribe(onClearEvent(OPEN_SCRATCH, this.openScratch.bind(this)))
		subscribe(onEvent(GET_BONUS, this.onGetBonus.bind(this)))
		subscribe(onEvent(END_ROUND, this.toShowPlayBar.bind(this)))
	}

	protected initStage = (): void => {
		this.store.dispatch(initStartGameAction())
	}

	protected toPlayGame(): void {
		this.store.dispatch(playAction())
	}

	protected toShowPlayBar(): void {
		const { dispatch } = this.store
		this.viewPort.addTickOnce(() => {
			dispatch(showPlayBarAction())
		})
	}

	protected toResetScratches(): void {
		const { dispatch } = this.store
		dispatch(resetScratchesAction())
	}

	protected openScratch(payload: { id: number }): void {
		const { dispatch } = this.store
		const { id } = payload
		let bonus: BonusType
		if (id !== 0) {
			bonus = this.generateBonusForCard()
		} else {
			bonus = this.generateBonusForWinner()
		}
		this.viewPort.addTickOnce(() => {
			dispatch(getBonusAction({
				id,
				bonus,
			}))
		})
	}

	protected onGetBonus(): void {
		const { scratchesReducer } = this.store.getState()
		const { dispatch } = this.store
		if (scratchesReducer.allIsOpen) {
			this.viewPort.addTickOnce(() => {
				dispatch(endRound())
			})
		}
	}

	protected generateBonusForWinner(): BonusType {
		const dice = this.toDice()
		if (dice > 80) {   // 20%
			return BonusType.Cash
		} else {           // 80%
			return BonusType.Coin
		}
	}

	protected generateBonusForCard(): BonusType {
		const dice = this.toDice() // TODO move this ratio to settings
		if (dice > 98) {   // 2%
			return BonusType.Tent
		} if (dice > 96) { // 4%
			return BonusType.Rope
		} if (dice > 94) { // 6%
			return BonusType.Leaf
		} if (dice > 92) { // 8%
			return BonusType.Bow
		} if (dice > 90) { // 10% 
			return BonusType.Bonfire
		} else {           // 70%
			return BonusType.Lose
		}
	}

	protected toDice(): number {
		return _.random(1, 100)
	}

}

export default Game;
