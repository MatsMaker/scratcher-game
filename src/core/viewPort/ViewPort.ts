import { injectable, inject } from 'inversify';
import isMobile from 'ismobilejs';
import * as _ from 'lodash';
import { StoreType } from '../../store';
import TYPES from '../../types/MainConfig';
import { waitReRenderViewPort } from './utils';
import { viewPortResizeAction, setAreaSizeAction } from './actions';
import { Application, Container, Ticker } from 'pixi.js';
import { onEvent } from '../../utils/store.subscribe';
import { VIEW_PORT_RESIZE_ACTION } from './types';
import Config from '../../core/config/Config';
import { AreaSizeType } from '../../core/config/types';


@injectable()
class ViewPort {

	protected store: StoreType;
	protected app: Application;
	protected config: Config;

	constructor(
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Application) app: Application,
	) {
		this.config = config;
		this.store = store;
		this.app = app;
		this.init();
	}

	public addTickOnce(fn: (...params: any[]) => any, context?: any, priority?: number): Ticker { // TODO will be fine to create decorator for cowered method and not use cb
		return this.app.ticker.addOnce(fn, context, priority)
	}

	public get scene(): Container {
		return this.app.stage;
	}

	public updateLayersOrder = (): void => {
		this.app.stage.children.sort(function (a, b) {
			a.zIndex = a.zIndex || 0;
			b.zIndex = b.zIndex || 0;
			return b.zIndex - a.zIndex
		});
	}

	public getStartPointSaveArea = (): Array<number> => {
		const { viewPort } = this.store.getState()
		return [viewPort.saveStartX, viewPort.saveStartY]
	}

	public getRatioOfSaveArea = (): number => {
		const { viewPort } = this.store.getState();
		return viewPort.saveRatio;
	}

	public getSaveAreaSize = (): AreaSizeType => {
		const { viewPort } = this.store.getState();
		return {
			width: viewPort.cnfgSaveWidth,
			height: viewPort.cnfgSaveHeight,
		}
	}

	public convertPointToSaveArea = ([x, y]: Array<number>, offset: Array<number> = [0, 0]): Array<number> => {
		const { viewPort } = this.store.getState();
		return [
			viewPort.saveStartX + ((x + offset[0]) * viewPort.saveRatio),
			viewPort.saveStartY + ((y + offset[1]) * viewPort.saveRatio)
		]
	}

	public convertXtoSaveArea = (x: number): number => {
		const { viewPort } = this.store.getState();
		return viewPort.saveStartX + (x * viewPort.saveRatio);
	}

	public convertYtoSaveArea = (y: number): number => {
		const { viewPort } = this.store.getState();
		return viewPort.saveStartY + (y * viewPort.saveRatio);
	}

	protected init = (): void => {
		this.initListeners();
		const saveAreaSize = this.config.getSaveAreaSize();
		this.store.dispatch(setAreaSizeAction(saveAreaSize));
		this.store.dispatch(viewPortResizeAction());
		this.resize();
		document.body.appendChild(this.app.view);
	}

	protected initListeners = (): void => {
		const { subscribe } = this.store
		if (isMobile().any) {
			window.addEventListener('orientationchange', () => {
				waitReRenderViewPort(this.onScreenResized)
			})
		} else {
			window.addEventListener('resize', () => {
				waitReRenderViewPort(this.onScreenResized)
			})
		}
		subscribe(onEvent(VIEW_PORT_RESIZE_ACTION, () => {
			this.resize();
		}))
	}

	protected resize = (): void => {
		const { viewPort } = this.store.getState();
		this.app.resize();
		this.app.renderer.resize(viewPort.width, viewPort.height);
	}

	protected onScreenResized = _.debounce(() => {
		this.store.dispatch(viewPortResizeAction());
	}, 100)
}

export default ViewPort