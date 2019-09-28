import { injectable, inject } from 'inversify';
import isMobile from 'ismobilejs';
import * as _ from 'lodash';
import { StoreType } from '../../store';
import TYPES from '../../types';
import { waitReRenderViewPort } from './utils';
import { viewPortResizeAction } from './actions';
import { Application } from 'pixi.js';
import { onEvent } from '../../utils/store.subscribe';
import { VIEW_PORT_RESIZE_ACTION } from './types';


@injectable()
class ViewPort {

	protected store: StoreType;
	protected app: Application;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Application) app: Application,
	) {
		this.store = store;
		this.app = app;
		this.init();
	}

	protected init = (): void => {
		this.initListeners();
	}

	protected initListeners = (): void => {
		if (isMobile().any) {
			window.addEventListener('orientationchange', () => {
				waitReRenderViewPort(this.onScreenResized)
			});
		} else {
			window.addEventListener('resize', () => {
				waitReRenderViewPort(this.onScreenResized)
			});
		}
		this.store.subscribe(onEvent(VIEW_PORT_RESIZE_ACTION, () => {
			this.resizeCanvas();
		}));
	}

	protected resizeCanvas = (): void => {
		const { viewPort } = this.store.getState();
		console.log('!!!!!!!!');
		
		this.app.view.style.height = String(viewPort.height) + 'px';
		this.app.view.style.width = String(viewPort.width) + 'px';
	}

	protected onScreenResized = _.debounce(() => {
		this.store.dispatch(viewPortResizeAction());
	}, 400)
}

export default ViewPort