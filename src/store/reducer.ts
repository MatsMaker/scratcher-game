import { combineReducers } from 'redux';
import { assetsReducer } from '../core/assetsLoader/assets.reducer';
import { viewPortReducer } from '../core/viewPort/viewPort.reducer';
import { lastAction } from './lastAction.reducer';

export const rootReducer = combineReducers({
	assets: assetsReducer,
	viewPort: viewPortReducer,
	lastAction,
});