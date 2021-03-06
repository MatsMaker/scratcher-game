import { injectable, inject } from 'inversify';
import { Application, Texture } from 'pixi.js';
import TYPES from '../../types/MainConfig';
import ABaseContainer from '../AContainer/ABaseContainer';
import { StoreType } from '../../store';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import ViewPort from '../../core/viewPort/ViewPort';
import { ScratchEntity } from '../../entities/Scratch.entity';
import { movePoint } from '../../utils/math';
import { openScratcherAction, scratchesRestoredAction, onMouseoverScratcherAction } from './actions';
import ScratchGroupEntity from '../../entities/ScratchGroup.entity';
import { RESET_SCRATCHES, ImageSize, SET_INTERACTION } from './types';
import { onClearEvent } from '../../utils/store.subscribe';
import { GET_BONUS, BonusType, END_ROUND } from '../../game/types';
import { SpriteEntity } from '../../entities/Sprite.entity';


@injectable()
class ScratchesContainer extends ABaseContainer {

	protected name = 'SCRATCHES'
	protected app: Application
	protected frameSprite: SpriteEntity
	protected scratchEntity: ScratchEntity
	protected scratchGroupEntity: ScratchGroupEntity
	protected position: Array<number> = [0, 0];

	constructor(
		@inject(TYPES.Application) app: Application,
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config,
		@inject(TYPES.AssetsLoader) assetsLoader: AssetsLoader,
		@inject(TYPES.ViewPort) viewPort: ViewPort
	) {
		super()
		this.app = app
		this.store = store
		this.config = config
		this.assetsLoader = assetsLoader
		this.viewPort = viewPort
		this.init()
	}

	protected renderContent = (): void => {
		const { position } = this;

		const bgAsset = this.assetsLoader.getResource('img/magic_forest_winner_frame')
		const framePosition = [528, 140]
		this.frameSprite = new SpriteEntity(this.viewPort, {
			texture: bgAsset.texture,
			name: 'ForestWinnerFrame',
			position: framePosition,
		});
		this.container.addChild(this.frameSprite.sprite)

		const scratchAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame_big')
		const bgRevealAsset = this.assetsLoader.getResource('img/magic_forest_frame')
		const scratchPosition = [615, 368]
		this.scratchEntity = new ScratchEntity(this.viewPort, {
			id: 0,
			renderer: this.app.renderer,
			name: 'BigScratch',
			scratchTexture: scratchAsset.texture,
			textureToReveal: bgRevealAsset.texture,
			bgTexture: bgRevealAsset.texture,
			position: movePoint(position, scratchPosition),
			contentCorrection: [180, 190, 2.3],
			onOpening: this.onOpenScratcher,
			onMouseover: this.onMouseoverScratcher,
		})
		this.container.addChild(this.scratchEntity.container)

		const scratchSmallAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame')
		this.scratchGroupEntity = new ScratchGroupEntity(this.viewPort, {
			startId: 1,
			name: 'SmallScratchesGroup',
			scratchTexture: scratchSmallAsset.texture,
			textureToReveal: bgRevealAsset.texture,
			position: movePoint(position, [75, 1225]),
			bgTexture: bgRevealAsset.texture,
			contentCorrection: [140, 135, 2.3],
			onOpening: this.onOpenScratcher,
			onMouseover: this.onMouseoverScratcher,
		})
		this.container.addChild(this.scratchGroupEntity.container)

		this.reRender()
	}

	protected initListeners = (): void => {
		const { subscribe } = this.store
		super.initListeners()
		subscribe(onClearEvent(GET_BONUS, this.onOpenedScratch.bind(this)))
		subscribe(onClearEvent(RESET_SCRATCHES, this.resetAll.bind(this)))
		subscribe(onClearEvent(SET_INTERACTION, this.setInteraction.bind(this)))
		subscribe(onClearEvent(END_ROUND, this.clearAllScratches.bind(this)))
	}

	protected setInteraction(payload: { interaction: boolean }): void {
		const { interaction } = payload
		this.scratchEntity.setInteractive(interaction)
		this.scratchGroupEntity.setInteractive(interaction)
	}

	protected reRender = (): void => {
		this.frameSprite.reRender()
		this.scratchEntity.reRender()
		this.scratchGroupEntity.reRender()
	}

	protected resetAll(): void {
		const { dispatch } = this.store
		this.scratchEntity.reset()
		this.scratchGroupEntity.resetAll()
		this.viewPort.addTickOnce(() => {
			dispatch(scratchesRestoredAction())
		})
	}

	protected onMouseoverScratcher = (): void => {
		this.store.dispatch(onMouseoverScratcherAction())
	}

	protected onOpenedScratch(payload: { id: number, bonus: BonusType }): void {
		const { getResource } = this.assetsLoader
		const { id, bonus } = payload
		if (id == 0) {
			const images: Array<string> = this.config.getBonusImages(bonus)
			const texture: Texture = (images) ? getResource(images[ImageSize.BIG]).texture : null
			this.scratchEntity.setTextureToReveal(texture)
			this.scratchEntity.toOpen()
		} else {
			const images: Array<string> = this.config.getBonusImages(bonus)
			const texture: Texture = (images) ? getResource(images[ImageSize.SMALL]).texture : null
			this.scratchGroupEntity.setTextureToReveal(id, texture)
			this.scratchGroupEntity.toOpen(id)
		}
	}

	protected onOpenScratcher = (id: number): void => {
		this.store.dispatch(openScratcherAction({ id }))
	}

	protected clearAllScratches(): void {
		this.scratchEntity.clearScratch()
		this.scratchGroupEntity.toClearAll()
	}

}

export default ScratchesContainer