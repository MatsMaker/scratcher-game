import * as PIXI from 'pixi.js';
import { isDevelopment } from './utils/build';
import { removeLoader } from './utils/loader';
import main from './main.config';
import TYPES from './types';
import Game from './core/game/Game';

if (isDevelopment()) {
	PIXI.useDeprecated();
	(<any>window).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
		(<any>window).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
}

removeLoader();
const game = main.get<Game>(TYPES.Game);
game.launch();