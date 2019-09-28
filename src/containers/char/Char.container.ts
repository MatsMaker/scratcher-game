import { injectable, inject } from "inversify";
import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
import TYPES from "../../types";
import ViewPort from "../../core/viewPort/ViewPort";
import AssetsLoader from "../../core/assetsLoader/AssetsLoader";
import { StoreType } from "../../store";
import { onEvent } from "../../utils/store.subscribe";
import { RENDER_CHAR } from "./types";


@injectable()
class CharContainer {

	protected store: StoreType;
	protected assetsLoader: AssetsLoader;
	protected viewPort: ViewPort;
	protected container: PIXI.Container;
	protected char: PIXI.spine.Spine;

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort
	) {
		this.store = store;
		this.assetsLoader = assetsLoader;
		this.viewPort = viewPort;
		this.init();
	}

	protected init = (): void => {
		this.container = new PIXI.Container();
		this.container.name = 'char';
		this.container.zIndex = 100;
		this.initListeners();
	}

	protected initChart = (): void => {
		const { spineData } = this.assetsLoader.getResource('spine/char_spine_v5/Red.json');
		this.char = new PIXI.spine.Spine(spineData);
		this.char.skeleton.setSkinByName('default');
		this.char.skeleton.setSlotsToSetupPose();
		this.reRenderChar();
		this.container.addChild(this.char);
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(RENDER_CHAR, () => {
			this.initChart();
			this.renderChar();
		}))
	}

	protected renderChar = (): void => {
		console.log('ch');
		this.viewPort.stage.addChild(this.container);		
		this.viewPort.updateLayersOrder();
	};

	protected reRenderChar = (): void => {
		const { viewPort } = this.store.getState();
		this.char.position.set(viewPort.centerWidth, viewPort.centerHeight);
	}

}

export default CharContainer;