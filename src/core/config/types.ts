import { BonusType } from "containers/scratches/types";

export interface AreaSizeType {
	width: number,
	height: number,
}

export interface GSettings {
	assetsPath: string
	assetsList: Array<string>
	size: string
	saveArea: {
		width: string,
		height: string,
	}
	bonusImages: Array<Array<string>>
	[key: string]: any
}