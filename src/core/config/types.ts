export interface AreaSizeType {
	width: number,
	height: number,
}

export interface GSettings {
	assetsPath: string;
	assetsList: Array<string>;
	size: string;
	saveArea: {
		width: string,
		height: string,
	},
	[key: string]: any;
}