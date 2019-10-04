import { injectable } from 'inversify';
import { GSettings, AreaSizeType } from './types';

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
			height: Number(height)
		}
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