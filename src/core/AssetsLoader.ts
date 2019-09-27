import { Loader, LoaderResource } from 'pixi.js';
import { injectable, inject } from 'inversify';
import * as _ from 'lodash';
import * as path from 'path';
import TYPES from '../types';
import Config from './Config';
import { StoreType } from '../store';
import { assetsIsLoadedAction } from './actions';

@injectable()
class AssetsLoader {

	protected store: StoreType;
	protected loader: Loader;
	protected config: Config;
	protected cbOnReady: Function;
	protected resources: Partial<Record<string, LoaderResource>>

	constructor(
		@inject(TYPES.Store) store: StoreType,
		@inject(TYPES.Config) config: Config
	) {
		this.store = store;
		this.config = config;
		this.loader = new Loader();
		this.initListeners();
	}

	public getResource(key: string): LoaderResource {
		console.log('getResource', this.resources);
		return this.resources[key];
	}

	public load() {
		this.prepareAssets();
		this.loader.load();
	}

	protected initListeners(): void {
		this.loader.onComplete.add(this.onComplete);
	}

	protected prepareAssets(): void {
		const assetsImgPath: string = this.config.getAssetsImgPath();
		const assetsImgList: Array<string> = this.config.getAssetsList();
		_.forEach(assetsImgList, (img: string) => {
			const imgPath: string = path.resolve(assetsImgPath, img);
			this.loader.add(img, imgPath);
		});
	}

	// @ts-ignore
	protected onComplete = (loader: Loader, resources: Partial<Record<string, LoaderResource>>) => {
		this.proxyAssets(resources);
		this.store.dispatch(assetsIsLoadedAction());
	};

	protected proxyAssets = (resources: Partial<Record<string, LoaderResource>>) => {
		this.resources = resources;
	}

}

export default AssetsLoader;