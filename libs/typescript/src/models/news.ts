import {JsonBuilder, JsonSerializer} from '@ffk/lib-util';

export class News {

}

export class NewsJsonSerializer extends JsonSerializer<News> {

	static instance: NewsJsonSerializer = new NewsJsonSerializer();

	fromJson(json: any): News {
		return new News();
	}

	toJson(value: News, builder: JsonBuilder): object {
		return {};
	}

}