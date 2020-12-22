import {JsonBuilder, JsonSerializer, parseDate, parseSetSerialized, parseString} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {Moment} from 'moment';
import {User, UserJsonSerializer} from './user';
import {Set} from 'immutable';
import {ccKey, contentKey, dateKey, idKey, titleKey, userKey} from '../misc/json-keys';

export class News {

	constructor(
		private id: Option<string> = None,
		private user: Option<User> = None,
		private cc: Set<User> = Set(),
		private title: Option<string> = None,
		private content: Option<string> = None,
		private date: Option<Moment> = None,
	) {
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getUser(): Option<User> {
		return this.user;
	}

	public getCc(): Set<User> {
		return this.cc;
	}

	public getTitle(): Option<string> {
		return this.title;
	}

	public getContent(): Option<string> {
		return this.content;
	}

	public getDate(): Option<Moment> {
		return this.date;
	}

}

export class NewsJsonSerializer extends JsonSerializer<News> {

	static instance: NewsJsonSerializer = new NewsJsonSerializer();

	fromJson(json: any): News {
		return new News(
			parseString(json[idKey]),
			UserJsonSerializer.instance.fromJsonImpl(json[userKey]),
			parseSetSerialized(json[ccKey], UserJsonSerializer.instance),
			parseString(json[titleKey]),
			parseString(json[contentKey]),
			parseDate(json[dateKey]),
		);
	}

	toJson(value: News, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
			.addIterableSerialized(value.getCc(), ccKey, UserJsonSerializer.instance)
			.addOptional(value.getTitle(), titleKey)
			.addOptional(value.getContent(), contentKey)
			.addOptionalDate(value.getDate(), dateKey)
			.build();
	}
}