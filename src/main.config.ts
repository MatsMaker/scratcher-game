import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from 'pixi.js';
import * as settings from './settings.json';

import { StoreType, store } from './store';
import TYPES from './types';

import FieldContainer from './containers/field/Field.container';
import AssetsLoader from './core/assetsLoader/AssetsLoader';
import Config from './core/config/Config';
import Game from './core/game/Game';
import ViewPort from './core/viewPort/ViewPort';

import BackgroundContainer from './containers/background/Background.container';

import StartGameStage from './stages/StartGame.stage';


const main = new Container({ defaultScope: "Singleton" });
main.bind<Config>(TYPES.Config).toConstantValue(new Config(settings));
main.bind<StoreType>(TYPES.Store).toConstantValue(store);
main.bind<Application>(TYPES.Application).toConstantValue(new Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	transparent: true,
	resolution: 1
}))
main.bind<ViewPort>(TYPES.ViewPort).to(ViewPort);
main.bind<AssetsLoader>(TYPES.AssetsLoader).to(AssetsLoader);
main.bind<Game>(TYPES.Game).to(Game);

main.bind<BackgroundContainer>(TYPES.BackgroundContainer).to(BackgroundContainer);
main.bind<FieldContainer>(TYPES.FieldContainer).to(FieldContainer);

main.bind<StartGameStage>(TYPES.StartGameStage).to(StartGameStage);


export default main;