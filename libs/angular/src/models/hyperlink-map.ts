import {None, Option, Some} from "funfix-core";

export class HyperlinkMap {

	constructor(
		private label: Option<string> = None,
		private hyperlink: Option<string> = None,
		private active: Option<boolean> = Some(false),
		private callback?: (...x: any) => any,
	) {
	}

	public getCallback(): Option<any> {
		return Option.of(this.callback);
	}

	public getHyperlink(): Option<string> {
		return this.label;
	}

	public getLabel(): Option<string> {
		return this.label;
	}

	public isActive(): boolean {
		return this.active.contains(true);
	}

}