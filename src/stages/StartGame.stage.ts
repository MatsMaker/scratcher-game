import { injectable, inject } from 'inversify';
import BackgroundContainer from '../containers/background/Background.container';
import TYPES from '../types';
import { StoreType } from '../store';
import { renderBackgroundAction } from '../containers/background/action';

@injectable()
class StartGameStage {

	protected backgroundContainer: BackgroundContainer;
	protected store: StoreType;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.BackgroundContainer) backgroundContainer: BackgroundContainer,
	) {
		this.store = store;
		this.backgroundContainer = backgroundContainer;
	}

	public initScreen = () => {
		this.store.dispatch(renderBackgroundAction());
	}

}

export default StartGameStage
