import {Collection, List, Set} from 'immutable';
import {Option} from 'funfix-core';

export class OptionUtils {

	/**
	 * Flatten any datatype that extends/inherits a Functor that in itself isn't a HKT
	 * but is a derived HKT
	 */
	static flattenCollection<T>(collection: Collection<any, Option<T>>): Collection<any, T> {
		return collection.filter(v => v.nonEmpty())
			.map(v => v.get());
	}

	static toCollection<T>(items: Collection<any, Option<T>>): Collection<any, T> {
		return items.filter(v => v.nonEmpty())
			.map(v => v.get());
	}

	static toList<T>(...items: Option<T>[]): List<T> {
		return OptionUtils.toCollection(List.of(...items)).toList();
	}

	static toSet<T>(...items: Option<T>[]): Set<T> {
		return OptionUtils.toCollection(Set.of(...items)).toSet();
	}

}