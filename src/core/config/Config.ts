import { injectable } from 'inversify';
import { GSettings } from './types';

@injectable()
class Config {

	protected settings: GSettings

	constructor(settings: GSettings) {
		this.settings = settings;
	}

	public get(key: string) {
		return this.settings[key];
	}

	public getAssetsList(): Array<string> {
		return this.settings.assetsImages;
	}

	public getAssetsImgPath(): string {
		return this.settings.assetsImgPath;
	}

}

export default Config;