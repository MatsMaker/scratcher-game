import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from 'pixi.js';
import TYPES from './types';
import Game from './core/Game';
import Config from './core/Config';
import AssetsLoader from './core/AssetsLoader';
import * as settings from './settings.json';
import { StoreType, store } from './store';
import BackgroundContainer from './containers/background/Background.container';
import FieldContainer from './containers/field/Field.container';


const main = new Container({ defaultScope: "Singleton" });
main.bind<StoreType>(TYPES.Store).toConstantValue(store);
main.bind<Config>(TYPES.Config).toConstantValue(new Config(settings));
main.bind<Application>(TYPES.Application).toConstantValue(new Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	transparent: true,
	resolution: 1
}))
main.bind<AssetsLoader>(TYPES.AssetsLoader).to(AssetsLoader);
main.bind<Game>(TYPES.Game).to(Game);

main.bind<BackgroundContainer>(TYPES.BackgroundContainer).to(BackgroundContainer);
main.bind<FieldContainer>(TYPES.FieldContainer).to(FieldContainer);


export default main;