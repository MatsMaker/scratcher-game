import { combineReducers } from 'redux';
import { gameReducer } from '../core/game.reducer';
import { viewPortReducer } from '../store/viewPort.reducer';
import { lastAction } from './lastAction.reducer';

export const rootReducer = combineReducers({
	game: gameReducer,
	viewPort: viewPortReducer,
	lastAction,
});