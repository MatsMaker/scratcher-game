import { injectable, inject } from 'inversify';
import BackgroundContainer from '../containers/background/Background.container';
import TYPES from '../types';
import { StoreType } from '../store';
import { renderBackgroundAction } from '../containers/background/action';
import CharContainer from '../containers/char/Char.container';
import { renderChar } from '../containers/char/action';

@injectable()
class StartGameStage {

	protected store: StoreType;
	protected backgroundContainer: BackgroundContainer;
	protected charContainer: CharContainer;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.BackgroundContainer) backgroundContainer: BackgroundContainer,
		@inject(TYPES.CharContainer) charContainer: CharContainer,
	) {
		this.store = store;
		this.backgroundContainer = backgroundContainer;
		this.charContainer = charContainer;
	}

	public initScreen = () => {
		this.store.dispatch(renderChar());
		this.store.dispatch(renderBackgroundAction());
	}

}

export default StartGameStage
