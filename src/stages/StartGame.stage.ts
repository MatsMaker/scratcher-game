import { injectable, inject } from 'inversify';
import BackgroundContainer from '../containers/background/Background.container';
import TYPES from '../types/MainConfig';
import { StoreType } from '../store';
import { renderBackgroundAction, reRenderBackgroundAction } from '../containers/background/action';
import CharContainer from '../containers/char/Char.container';
import { renderCharAction, reRenderCharAction } from '../containers/char/action';
import ViewPort from '../core/viewPort/ViewPort';
import { onEvent } from '../utils/store.subscribe';
import { VIEW_PORT_RESIZE_ACTION } from '../core/viewPort/types';
import { reRenderWinUpAction, renderWinUpAction } from '../containers/winUp/actions';
import WinUpContainer from '../containers/winUp/WinUp';
import WinnerFrameContainer from '../containers/winnerFrame/WinnerFrame.container';
import * as winnerFrameAction from '../containers/winnerFrame/actions';
import * as notificationActions from '../containers/notification/actions';
import NotificationContainer from '../containers/notification/Notification';
import ModalWindowContainer from '../containers/modalWindow/ModalWindow';
import * as modalWindowActions from '../containers/modalWindow/actions';

@injectable()
class StartGameStage {

	protected store: StoreType;
	protected viewPort: ViewPort;
	protected backgroundContainer: BackgroundContainer;
	protected charContainer: CharContainer;
	protected winUpContainer: WinUpContainer;
	protected winnerFrameContainer: WinnerFrameContainer;
	protected notificationContainer: NotificationContainer;
	protected modalWindowContainer: ModalWindowContainer;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.ViewPort) viewPort: ViewPort,
		@inject(TYPES.BackgroundContainer) backgroundContainer: BackgroundContainer,
		@inject(TYPES.CharContainer) charContainer: CharContainer,
		@inject(TYPES.WinUpContainer) winUpContainer: WinUpContainer,
		@inject(TYPES.WinnerFrameContainer) winnerFrameContainer: WinnerFrameContainer,
		@inject(TYPES.NotificationContainer) notificationContainer: NotificationContainer,
		@inject(TYPES.ModalWindowContainer) modalWindowContainer: ModalWindowContainer,
	) {
		this.store = store
		this.viewPort = viewPort
		this.backgroundContainer = backgroundContainer
		this.charContainer = charContainer
		this.winUpContainer = winUpContainer
		this.winnerFrameContainer = winnerFrameContainer
		this.notificationContainer = notificationContainer
		this.modalWindowContainer = modalWindowContainer
	}

	public initScreen = () => {
		this.viewPort.stage.addChild(this.backgroundContainer.view)
		this.viewPort.stage.addChild(this.charContainer.view)
		this.viewPort.stage.addChild(this.winUpContainer.view)
		this.viewPort.stage.addChild(this.winnerFrameContainer.view)
		this.viewPort.stage.addChild(this.notificationContainer.view)
		this.viewPort.stage.addChild(this.modalWindowContainer.view)

		this.store.dispatch(renderBackgroundAction())
		this.store.dispatch(renderCharAction())
		this.store.dispatch(renderWinUpAction())
		this.store.dispatch(winnerFrameAction.renderAction())
		this.store.dispatch(notificationActions.renderAction())
		this.store.dispatch(modalWindowActions.renderAction())

		this.initListeners();
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(VIEW_PORT_RESIZE_ACTION, () => {
			this.store.dispatch(reRenderBackgroundAction())
			this.store.dispatch(reRenderCharAction())
			this.store.dispatch(reRenderWinUpAction())
			this.store.dispatch(winnerFrameAction.reRenderAction())
			this.store.dispatch(notificationActions.reRenderAction())
			this.store.dispatch(modalWindowActions.reRenderAction())
		}))
	}

}

export default StartGameStage
