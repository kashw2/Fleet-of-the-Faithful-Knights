import {User} from "./user";
import {List} from "immutable";
import {Either} from "funfix-core";
import {EitherUtils} from "..";
import {News} from "./news";

// Partial builder pattern implementation

export class NewsCache {

    constructor(private news: List<News>) {
    }

    getById(id: number): News {
        return this.getNews()
            .get(id)!;
    }

    getByIdEither(id: number): Either<string, News> {
        return EitherUtils.liftEither(this.getById(id), `Article ${id} does not exist in cache`);
    }

    getFirst(): News {
        return this.getNews()
            .first();
    }

    getLast(): News {
        return this.getNews()
            .last();
    }

    getNewsEither(): Either<string, List<News>> {
        return EitherUtils.liftEither(this.getNews(), 'No articles in news cache');
    }

    private getNews(): List<News> {
        return this.news;
    }

}
