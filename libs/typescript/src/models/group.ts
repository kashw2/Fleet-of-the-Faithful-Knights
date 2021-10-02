import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, OptionUtils, parseNumber, parseString} from '@kashw2/lib-util';
import {colourKey, hierarchyKey, idKey, labelKey} from '../misc/json-keys';

export class Group {

	constructor(
		private id: Option<string> = None,
		private label: Option<string> = None,
		private colour: Option<string> = None,
		private hierarchy: Option<number> = None,
	) {
	}

	public getColour(): Option<string> {
		return this.colour;
	}

	public getHierarchy(): Option<number> {
		return this.hierarchy;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getLabel(): Option<string> {
		return this.label;
	}

	public is(group: Group): boolean {
		return OptionUtils.exists2(this.getHierarchy(), group.getHierarchy(), (cGid, oGid) => cGid > oGid);
	}

	public isHigher(group: Group): boolean {
		return OptionUtils.exists2(this.getHierarchy(), group.getHierarchy(), (cGhid: number, oGhid: number) => {
			return cGhid > oGhid;
		});
	}

	public isHigherOrEqual(group: Group): boolean {
		return OptionUtils.exists2(this.getHierarchy(), group.getHierarchy(), (cGhid: number, oGhid: number) => {
			return cGhid >= oGhid;
		});
	}

	public isLower(group: Group): boolean {
		return OptionUtils.exists2(this.getHierarchy(), group.getHierarchy(), (cGhid: number, oGhid: number) => {
			return cGhid < oGhid;
		});
	}

	public isLowerOrEqual(group: Group): boolean {
		return OptionUtils.exists2(this.getHierarchy(), group.getHierarchy(), (cGhid: number, oGhid: number) => {
			return cGhid <= oGhid;
		});
	}

}

export class GroupJsonSerializer extends JsonSerializer<Group> {

	static instance: GroupJsonSerializer = new GroupJsonSerializer();

	fromJson(json: any): Group {
		return new Group(
			parseString(json[idKey]),
			parseString(json[labelKey]),
			parseString(json[colourKey]),
			parseNumber(json[hierarchyKey]),
		);
	}

	toJson(value: Group, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getLabel(), labelKey)
			.addOptional(value.getColour(), colourKey)
			.addOptional(value.getHierarchy(), hierarchyKey)
			.build();
	}

}
