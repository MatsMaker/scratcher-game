import { injectable, inject } from 'inversify';
import BackgroundContainer from '../containers/background/Background.container';
import TYPES from '../types';
import { StoreType } from '../store';
import { renderBackgroundAction, reRenderBackgroundAction } from '../containers/background/action';
import CharContainer from '../containers/char/Char.container';
import { renderChar, reRenderCharAction } from '../containers/char/action';
import ViewPort from '../core/viewPort/ViewPort';
import { onEvent } from '../utils/store.subscribe';
import { VIEW_PORT_RESIZE_ACTION } from '../core/viewPort/types';

@injectable()
class StartGameStage {

	protected store: StoreType;
	protected viewPort: ViewPort;
	protected backgroundContainer: BackgroundContainer;
	protected charContainer: CharContainer;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.ViewPort) viewPort: ViewPort,
		@inject(TYPES.BackgroundContainer) backgroundContainer: BackgroundContainer,
		@inject(TYPES.CharContainer) charContainer: CharContainer,
	) {
		this.store = store;
		this.viewPort = viewPort;
		this.backgroundContainer = backgroundContainer;
		this.charContainer = charContainer;
	}

	public initScreen = () => {
		this.viewPort.stage.addChild(this.backgroundContainer.view);
		this.viewPort.stage.addChild(this.charContainer.view);

		this.store.dispatch(renderBackgroundAction());
		this.store.dispatch(renderChar());

		this.initListeners();
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(VIEW_PORT_RESIZE_ACTION, () => {
			this.store.dispatch(reRenderBackgroundAction());
			this.store.dispatch(reRenderCharAction());
		}))
	}

}

export default StartGameStage
