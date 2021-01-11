import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {StringUtils} from '@ffk/lib-util';

export class HyperlinkMap {

	constructor(
		private label: Option<string> = None,
		private hyperlink: Option<string> = None,
		private active: Option<boolean> = Some(false),
		private dropdownHyperlinks: Set<HyperlinkMap> = Set(),
		private callback?: (...x: any) => any,
	) {
	}

	public getCallback(): any {
		return this.callback;
	}

	public getDropdownHyperlinks(): Set<HyperlinkMap> {
		return this.dropdownHyperlinks;
	}

	public getHyperlink(): Option<string> {
		return this.hyperlink;
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