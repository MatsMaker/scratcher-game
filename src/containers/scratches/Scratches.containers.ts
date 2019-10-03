import { injectable, inject } from 'inversify';
import { Application, LoaderResource } from 'pixi.js';
import TYPES from '../../types/MainConfig';
import ABaseContainer from '../AContainer/ABaseContainer';
import { StoreType } from '../../store';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import ViewPort from '../../core/viewPort/ViewPort';
import { SpriteEntity } from '../../entities/Sprite.entity';
import { ScratchEntity } from '../../entities/Scratch.entity';
import { movePoint } from '../../utils/math';
import { openScratcherAction, scratchesRestoredAction } from './actions';
import ScratchGroupEntity from '../../entities/ScratchGroup.entity';
import { BonusType, RESET_SCRATCHES } from './types';
import { onClearEvent } from '../../utils/store.subscribe';
import { GET_BONUS } from '../../game/types';


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

		const bgAsset = this.assetsLoader.getResource('img/magic_forest_winner_frame');
		this.frameSprite = new SpriteEntity(this.viewPort, {
			texture: bgAsset.texture,
			name: 'ForestWinnerFrame',
			position: [528, 140],
		});
		this.container.addChild(this.frameSprite.sprite);

		const scratchAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame_big')
		const bgRevealAsset = this.assetsLoader.getResource('img/magic_forest_frame')
		this.scratchEntity = new ScratchEntity(this.viewPort, {
			id: 0,
			// app: this.app,
			name: 'BigScratch',
			scratchTexture: scratchAsset.texture,
			textureToReveal: bgRevealAsset.texture,
			position: movePoint(position, [615, 368]),
			positionContentCorrection: [50, 70],
			onOpening: this.onOpenScratcher,
		})
		this.container.addChild(this.scratchEntity.container)

		const scratchSmallAsset = this.assetsLoader.getResource('img/magic_forest_scratch_frame')
		this.scratchGroupEntity = new ScratchGroupEntity(this.viewPort, {
			startId: 1,
			app: this.app,
			name: 'SmallScratchesGroup',
			scratchTexture: scratchSmallAsset.texture,
			textureToReveal: bgRevealAsset.texture,
			position: movePoint(position, [75, 1225]),
			bgTexture: bgRevealAsset.texture,
			onOpening: this.onOpenScratcher,
		})
		this.container.addChild(this.scratchGroupEntity.container)

		this.reRender()
	}

	protected initListeners = (): void => {
		const { subscribe } = this.store
		super.initListeners()
		// subscribe(onClearEvent(OPEN_SCRATCH, this.onOpenedScratch.bind(this)))
		subscribe(onClearEvent(GET_BONUS, this.onOpenedScratch.bind(this)))
		subscribe(onClearEvent(RESET_SCRATCHES, this.resetAll.bind(this)))
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

	protected onOpenedScratch(payload: { id: number, bonus: BonusType }): void {
		const { id, bonus } = payload
		if (id == 0) {
			const scratchAsset = this.getAssetByBonus(bonus, true)
			this.scratchEntity.setTextureToReveal(scratchAsset.texture)
			this.scratchEntity.toOpen()
		} else {
			const scratchAsset = this.getAssetByBonus(bonus, false)
			this.scratchGroupEntity.setTextureToReveal(id, scratchAsset.texture)
			this.scratchGroupEntity.toOpen(id)
		}
	}

	protected onOpenScratcher = (id: number): void => {
		this.store.dispatch(openScratcherAction({ id }))
	}

	protected getAssetByBonus(bonus: BonusType, bigSize: boolean = false): LoaderResource {
		const { getResource } = this.assetsLoader
		switch (bonus) {
			case BonusType.Bonfire:
				return (bigSize) ? getResource('img/magic_forest_bonfire') : getResource('img/magic_forest_bonfire_small')
			case BonusType.Bow:
				return (bigSize) ? getResource('img/magic_forest_bow') : getResource('img/magic_forest_bow_small')
			case BonusType.Tent:
				return (bigSize) ? getResource('img/magic_forest_tent') : getResource('img/magic_forest_tent_small')
			case BonusType.Coin:
				return (bigSize) ? getResource('img/magic_forest_coin_icon_big') : getResource('img/magic_forest_coin_icon_small')
			case BonusType.Cash:
				return getResource('img/magic_forest_dollar_icon')
			case BonusType.Leaf:
				return (bigSize) ? getResource('img/magic_forest_leaf') : getResource('img/magic_forest_leaf_small')
			case BonusType.Rope:
				return (bigSize) ? getResource('img/magic_forest_rope') : getResource('img/magic_forest_rope_small')
			case BonusType.Lose:
				return getResource('img/magic_forest_frame')
		}
	}

}

export default ScratchesContainer