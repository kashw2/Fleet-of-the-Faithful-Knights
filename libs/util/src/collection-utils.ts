import {Collection} from 'immutable';
import {Option} from 'funfix-core';

export class CollectionUtils {

	/**
	 * Takes a given collection (assumes a functor) and transforms the contents into a Monad inside of a HKT
	 */
	static optionify<A>(collection: Collection<any, A>): Collection<any, Option<A>> {
		return collection.map(v => Option.of(v))
			.filter(v => v.nonEmpty());
	}

}