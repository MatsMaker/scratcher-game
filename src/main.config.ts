import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from 'pixi.js';
import * as settings from './settings.json';

import { StoreType, store } from './store';
import TYPES from './types/MainConfig';

import FieldContainer from './containers/field/Field.container';
import AssetsLoader from './core/assetsLoader/AssetsLoader';
import Config from './core/config/Config';
import Game from './game/Game';
import ViewPort from './core/viewPort/ViewPort';

import StartGameStage from './stages/StartGame.stage';

import BackgroundContainer from './containers/background/Background.container';
import CharContainer from './containers/char/Char.container';
import WinUpContainer from './containers/winUp/WinUp';
import NotificationContainer from './containers/notification/Notification';
import ModalWindowContainer from './containers/modalWindow/ModalWindow';
import ScratchesContainer from './containers/scratches/Scratches.containers';


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
main.bind<ViewPort>(TYPES.ViewPort).to(ViewPort)
main.bind<AssetsLoader>(TYPES.AssetsLoader).to(AssetsLoader)
main.bind<Game>(TYPES.Game).to(Game)

main.bind<BackgroundContainer>(TYPES.BackgroundContainer).to(BackgroundContainer)
main.bind<CharContainer>(TYPES.CharContainer).to(CharContainer)
main.bind<WinUpContainer>(TYPES.WinUpContainer).to(WinUpContainer)
main.bind<ScratchesContainer>(TYPES.ScratchesContainer).to(ScratchesContainer)
main.bind<NotificationContainer>(TYPES.NotificationContainer).to(NotificationContainer)
main.bind<ModalWindowContainer>(TYPES.ModalWindowContainer).to(ModalWindowContainer)

main.bind<FieldContainer>(TYPES.FieldContainer).to(FieldContainer)

main.bind<StartGameStage>(TYPES.StartGameStage).to(StartGameStage)


export default main;