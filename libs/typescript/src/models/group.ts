import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseString} from '@ffk/lib-util';
import {colourKey, idKey, labelKey} from '../misc/json-keys';

export class Group {

	constructor(
		private id: Option<string> = None,
		private label: Option<string> = None,
		private colour: Option<string> = None,
	) {
	}

	public getColour(): Option<string> {
		return this.colour;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getLabel(): Option<string> {
		return this.label;
	}

}

export class GroupJsonSerializer extends JsonSerializer<Group> {

	static instance: GroupJsonSerializer = new GroupJsonSerializer();

	fromJson(json: any): Group {
		return new Group(
			parseString(json[idKey]),
			parseString(json[labelKey]),
			parseString(json[colourKey]),
		);
	}

	toJson(value: Group, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getLabel(), labelKey)
			.addOptional(value.getColour(), colourKey)
			.build();
	}

}