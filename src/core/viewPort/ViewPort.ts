import { injectable, inject } from 'inversify';
import isMobile from 'ismobilejs';
import * as _ from 'lodash';
import { StoreType } from '../../store';
import TYPES from '../../types';
import { waitReRenderViewPort } from './utils';
import { viewPortResizeAction } from './actions';
import { Application, Container, Ticker } from 'pixi.js';
import { onEvent } from '../../utils/store.subscribe';
import { VIEW_PORT_RESIZE_ACTION } from './types';
import Config from '../../core/config/Config';


@injectable()
class ViewPort {

	protected store: StoreType;
	protected app: Application;
	protected config: Config;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Application) app: Application,
		@inject(TYPES.Config) config: Config,
	) {
		this.store = store;
		this.app = app;
		this.config = config;
		this.init();
	}

	public get ticker(): Ticker {
		return this.app.ticker;
	}

	public get stage(): Container {
		return this.app.stage;
	}

	public updateLayersOrder = (): void => {
		this.app.stage.children.sort(function (a, b) {			
			a.zIndex = a.zIndex || 0;
			b.zIndex = b.zIndex || 0;
			return b.zIndex - a.zIndex
		});
	}

	protected init = (): void => {
		this.initListeners();
		this.resize();
		document.body.appendChild(this.app.view);
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
			this.resize();
		}));
	}

	protected resize = (): void => {
		const { viewPort } = this.store.getState();
		this.app.resize();
		this.app.renderer.resize(viewPort.width, viewPort.height);
	}

	protected onScreenResized = _.debounce(() => {
		this.store.dispatch(viewPortResizeAction());
	}, 400)
}

export default ViewPort