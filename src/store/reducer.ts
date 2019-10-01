import { combineReducers } from 'redux'
import { assetsReducer } from '../core/assetsLoader/assets.reducer'
import { viewPortReducer } from '../core/viewPort/viewPort.reducer'
import {scratchesReducer } from '../containers/scratches/scratches.reducer'
import { lastAction } from './lastAction.reducer'

export const rootReducer = combineReducers({
	assets: assetsReducer,
	viewPort: viewPortReducer,
	scratchesReducer,
	lastAction,
});