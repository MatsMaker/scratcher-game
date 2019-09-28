import { injectable, inject } from 'inversify';
import isMobile from 'ismobilejs';
import * as _ from 'lodash';
import { StoreType } from '../../store';
import TYPES from '../../types';
import { waitReRenderViewPort } from './utils';
import { viewPortResizeAction } from './actions';


@injectable()
class ViewPort {

	protected store: StoreType;

	constructor(
		@inject(TYPES.Store) store: StoreType,
	) {
		this.store = store;
		console.log('!!!!!!!!!!');
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
	}

	protected onScreenResized = _.debounce(() => {
		this.store.dispatch(viewPortResizeAction());
	}, 400)
}

export default ViewPort