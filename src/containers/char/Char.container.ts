import { injectable, inject } from "inversify";
import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
import TYPES from "../../types/MainConfig";
import ViewPort from "../../core/viewPort/ViewPort";
import AssetsLoader from "../../core/assetsLoader/AssetsLoader";
import { StoreType } from "../../store";
import { onEvent, onClearEvent } from "../../utils/store.subscribe";
import { RENDER_CHAR, RE_RENDER_CHAR } from "./types"
import * as _ from 'lodash'
import { ON_HOVERING_SCRATCH } from "../../containers/scratches/types";
import { GET_BONUS, BonusType } from "../../game/types";
import Config from "../../core/config/Config";


@injectable()
class CharContainer {

	protected config: Config
	protected store: StoreType
	protected assetsLoader: AssetsLoader
	protected viewPort: ViewPort
	protected container: PIXI.Container
	protected char: PIXI.spine.Spine
	protected position: Array<number> = [310, 615]
	protected nextAnimation: string = null

	constructor(
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort
	) {
		this.config = config
		this.store = store;
		this.assetsLoader = assetsLoader;
		this.viewPort = viewPort;
		this.init();
	}

	get view(): PIXI.Container {
		return this.container;
	}

	protected init = (): void => {
		this.initContainer()
		this.initListeners()
	}

	protected initContainer = (): void => {
		this.container = new PIXI.Container()
		this.container.visible = false
		this.container.name = 'char'
	}

	protected renderChart = (): void => {
		const { spineData } = this.assetsLoader.getResource('spine/char_spine_v5/Red.json');
		this.char = new PIXI.spine.Spine(spineData);
		this.char.skeleton.setSkinByName('default');
		this.char.skeleton.setSlotsToSetupPose();
		this.reRender();
		this.container.addChild(this.char)

		this.animateChar()
	}

	protected initListeners = (): void => {
		const { subscribe } = this.store
		subscribe(onEvent(RENDER_CHAR, () => {
			this.render();
		}))
		subscribe(onEvent(RE_RENDER_CHAR, () => {
			this.reRender();
		}))
		subscribe(onEvent(ON_HOVERING_SCRATCH, this.animateWorry.bind(this)))
		subscribe(onClearEvent(GET_BONUS, this.onGetBonus.bind(this)))
	}

	protected animateChar(): void {
		if (_.isNull(this.nextAnimation)) {
			this.char.state.setAnimation(0, 'red_idle_loop', false)
		} else {
			this.char.state.setAnimation(0, this.nextAnimation, false)
			this.nextAnimation = null
		}
	}

	protected onGetBonus(payload: { id: number, bonus: BonusType }): void {
		const specialCardId = this.config.getSpecialCardId()
		if (payload.bonus !== BonusType.Lose) {
			if (payload.id === specialCardId) {
				this.nextAnimation = 'red_happy_bonus_loop'
			} else {
				this.nextAnimation = 'red_happy_card_loop'
			}
		} else {
			this.nextAnimation = 'red_disappointed_loop'
		}
		this.animateChar() // TODO need add time out between open scratch
	}

	protected animateWorry(): void {
		this.nextAnimation = 'red_worry_loop'
		this.animateChar() //NOTE mo better wait end animation but in assets animations has very long timing
	}

	protected render = (): void => {
		this.container.visible = true
		this.renderChart();
	};

	protected reRender = (): void => {
		const { viewPort } = this.store.getState();
		this.char.position.set(
			...this.viewPort.convertPointToSaveArea(this.position)
		);
		this.char.scale.set(viewPort.saveRatio)
		this.char.state.addListener({
			complete: this.onAnimationComplete.bind(this)
		})
	}

	protected onAnimationComplete(): void {
		// protected onAnimationComplete(entry: PIXI.spine.core.TrackEntry): void {
		this.animateChar()
	}

}

export default CharContainer