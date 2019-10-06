import { BonusType, WinType } from "../../game/types"

export interface AreaSizeType {
	width: number,
	height: number,
}



export interface WinAmountType {
	bonusId: BonusType
	win: WinType
}

export enum TIMING {
	MEDIUM = 'medium'
}
export interface WaitTime {
	[key: string]: number
}

export interface GSettings {
	assetsPath: string
	assetsList: Array<string>
	size: string
	saveArea: {
		width: number,
		height: number,
	}
	specialCard: number,
	bonusImages: Array<Array<string>>
	winAmounts: Array<WinAmountType>
	waitTime: WaitTime
	[key: string]: any
}