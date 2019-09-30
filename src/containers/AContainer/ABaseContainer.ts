import { Container } from 'pixi.js';
import { injectable } from 'inversify';
import Config from '../../core/config/Config';
import AssetsLoader from '../../core/assetsLoader/AssetsLoader';
import { StoreType } from 'store';
import { onEvent } from '../../utils/store.subscribe';
import ViewPort from '../../core/viewPort/ViewPort';

@injectable()
abstract class ABaseContainer {

	protected store: StoreType;
	protected config: Config;
	protected assetsLoader: AssetsLoader;
	protected viewPort: ViewPort;
	protected container: Container;
	protected name: string = 'AContainer';
	protected zIndex: number = 0;

	constructor() {}

	get view(): Container {
		return this.container;
	}

	protected init(): void {
		this.initContainer()
		this.initListeners()
	}

	protected initContainer(): void {
		this.container = new Container();
		this.container.visible = false;
		this.container.zIndex = this.zIndex;
		this.container.name = this.name;
	}

	protected initListeners = (): void => {
		this.store.subscribe(onEvent(`@CONTAINER/${this.name}/render`,
			() => this.viewPort.ticker.addOnce(this.render)));
		this.store.subscribe(onEvent(`@CONTAINER/${this.name}/re_render`,
			() => this.viewPort.ticker.addOnce(this.reRender)));
	}

	protected render = () => {
		this.renderContent();
		this.reRender();
		this.container.visible = true;
	}

	protected renderContent = () => {
	}

	protected reRender = () => {
	}

}

export default ABaseContainer;
