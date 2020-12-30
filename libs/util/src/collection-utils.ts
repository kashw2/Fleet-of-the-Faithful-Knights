import {Collection} from 'immutable';
import {Option} from 'funfix-core';

export class CollectionUtils {

	optionify<A>(collection: Collection<any, A>): Collection<any, Option<A>> {
		return collection.map(v => Option.of(v))
			.filter(v => v.nonEmpty());
	}

}