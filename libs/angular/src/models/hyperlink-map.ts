import {None, Option, Some} from "funfix-core";
import {StringUtils} from '@ffk/lib-util';

export class HyperlinkMap {

	constructor(
		private label: Option<string> = None,
		private hyperlink: Option<string> = label,
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
		return this.label
			.orElse(this.getHyperlink())
			.map(v => StringUtils.toTitleCase(v));
	}

	public isActive(): boolean {
		return this.active.contains(true);
	}

}