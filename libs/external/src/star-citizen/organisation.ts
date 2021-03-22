import {None, Option} from 'funfix-core';
import {
	StarCitizenOrganisationActivity,
	StarCitizenOrganisationArchetype,
	StarCitizenOrganisationCommitment
} from './types';
import {JsonBuilder, JsonSerializer, parseBoolean, parseNumber, parseString} from '@kashw2/lib-util';
import {
	archetypeKey, commitmentKey, exclusiveKey,
	hierarchyKey,
	idKey,
	nameKey,
	organisationRankKey, primaryActivityKey,
	primaryKey,
	primaryLanguageKey, recruitingKey, rolePlayKey, secondaryActivityKey
} from './json-keys';

export class StarCitizenOrganisation {

	constructor(
		private id: Option<string> = None, // SID In SC
		private name: Option<string> = None,
		private primary: Option<boolean> = None,
		private organisationRank: Option<string> = None,
		private hierarchy: Option<number> = None,
		private archetype: Option<StarCitizenOrganisationArchetype> = None,
		private primaryLanguage: Option<string> = None,
		private primaryActivity: Option<StarCitizenOrganisationActivity> = None,
		private recruiting: Option<boolean> = None,
		private secondaryActivity: Option<StarCitizenOrganisationActivity> = None,
		private rolePlay: Option<boolean> = None,
		private commitment: Option<StarCitizenOrganisationCommitment> = None,
		private exclusive: Option<boolean> = None,
	) {
	}

	public getArchetype(): Option<StarCitizenOrganisationArchetype> {
		return this.archetype;
	}

	public getCommitment(): Option<StarCitizenOrganisationCommitment> {
		return this.commitment;
	}

	public getExclusive(): Option<boolean> {
		return this.exclusive;
	}

	public getHierachy(): Option<number> {
		return this.hierarchy;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getOrganisationRank(): Option<string> {
		return this.organisationRank;
	}

	public getPrimary(): Option<boolean> {
		return this.primary;
	}

	public getPrimaryActivity(): Option<StarCitizenOrganisationActivity> {
		return this.primaryActivity;
	}

	public getPrimaryLanguage(): Option<string> {
		return this.primaryLanguage;
	}

	public getRecruiting(): Option<boolean> {
		return this.recruiting;
	}

	public getRolePlay(): Option<boolean> {
		return this.rolePlay;
	}

	public getSecondaryActivity(): Option<StarCitizenOrganisationActivity> {
		return this.secondaryActivity;
	}

}

export class StarCitizenOrganisationJsonSerializer extends JsonSerializer<StarCitizenOrganisation> {

	static instance: StarCitizenOrganisationJsonSerializer = new StarCitizenOrganisationJsonSerializer();

	fromJson(json: any): StarCitizenOrganisation {
		return new StarCitizenOrganisation(
			parseString(json[idKey]),
			parseString(json[nameKey]),
			parseBoolean(json[primaryKey]),
			parseString(json[organisationRankKey]),
			parseNumber(json[hierarchyKey]),
			parseString(json[archetypeKey]),
			parseString(json[primaryLanguageKey]),
			parseString(json[primaryActivityKey]),
			parseBoolean(json[recruitingKey]),
			parseString(json[secondaryActivityKey]),
			parseBoolean(json[rolePlayKey]),
			parseString(json[commitmentKey]),
			parseBoolean(json[commitmentKey]),
		);
	}

	toJson(value: StarCitizenOrganisation, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getName(), nameKey)
			.addOptional(value.getPrimary(), primaryKey)
			.addOptional(value.getOrganisationRank(), organisationRankKey)
			.addOptional(value.getHierachy(), hierarchyKey)
			.addOptional(value.getArchetype(), archetypeKey)
			.addOptional(value.getPrimaryLanguage(), primaryLanguageKey)
			.addOptional(value.getRecruiting(), recruitingKey)
			.addOptional(value.getSecondaryActivity(), secondaryActivityKey)
			.addOptional(value.getRolePlay(), rolePlayKey)
			.addOptional(value.getCommitment(), commitmentKey)
			.addOptional(value.getExclusive(), exclusiveKey)
			.build();
	}

}
