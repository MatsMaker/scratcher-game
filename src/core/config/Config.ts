import { injectable } from 'inversify';
import * as _ from 'lodash'
import { GSettings, AreaSizeType, WinAmountType } from './types';
import { BonusType, WinType } from '../../game/types';

@injectable()
class Config {

	protected settings: GSettings

	constructor(settings: GSettings) {
		this.settings = settings;
	}

	public get(key: string) {
		return this.settings[key];
	}

	public getSpecialCardId(): number {
		return Number(this.settings.specialCard)
	}

	public getSaveAreaSize = (): AreaSizeType => {
		const { width, height } = this.settings.saveArea
		return {
			width: Number(width),
			height: Number(height),
		}
	}

	public getWinAmount(bonusId: BonusType): WinType {
		const winAmount = _.find(this.settings.winAmounts, (wa: WinAmountType) => wa.bonusId === bonusId)
		return winAmount.win
	}

	public getAssetsList = (): Array<string> => {
		return this.settings.assetsList;
	}

	public getAssetsPath = (): string => {
		return this.settings.assetsPath;
	}

	public getBonusImages(bonus: number): Array<string> {
		return this.settings.bonusImages[bonus]
	}

}

export default Config;