import { injectable, inject } from "inversify";
import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
import TYPES from "../../types";
import ViewPort from "../../core/viewPort/ViewPort";
import AssetsLoader from "../../core/assetsLoader/AssetsLoader";
import { StoreType } from "../../store";
import { onEvent } from "../../utils/store.subscribe";
import { RENDER_CHAR, RE_RENDER_CHAR } from "./types";


@injectable()
class CharContainer {

	protected store: StoreType;
	protected assetsLoader: AssetsLoader;
	protected viewPort: ViewPort;
	protected container: PIXI.Container;
	protected char: PIXI.spine.Spine;
	protected position: Array<number> = [310, 615];

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

	get view(): PIXI.Container {
		return this.container;
	}

	protected init = (): void => {
		this.container = new PIXI.Container();
		this.container.visible = false;
		this.container.name = 'char';
		this.initListeners();
	}

	protected initChart = (): void => {
		const { spineData } = this.assetsLoader.getResource('spine/char_spine_v5/Red.json');
		this.char = new PIXI.spine.Spine(spineData);
		this.char.skeleton.setSkinByName('default');
		this.char.skeleton.setSlotsToSetupPose();
		this.reRenderChar();
		this.container.addChild(this.char);
		this.animateIdle();
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(RENDER_CHAR, () => {
			this.initChart();
			this.renderChar();
		}))
		this.store.subscribe(onEvent(RE_RENDER_CHAR, () => {
			this.reRenderChar();
		}));
	}

	protected renderChar = (): void => {
		this.container.visible = true;
	};

	protected reRenderChar = (): void => {
		const { viewPort } = this.store.getState();
		this.char.position.set(
			...this.viewPort.convertPointToSaveArea(this.position)
		);
		this.char.scale.set(viewPort.saveRatio);
	}

	protected animateIdle = (): void => {
		this.char.state.setAnimation(0, 'red_idle_loop', true);
	}

}

export default CharContainer;