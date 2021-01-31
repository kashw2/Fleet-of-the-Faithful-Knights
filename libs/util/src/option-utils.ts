import {Collection, List, Set} from 'immutable';
import {Either, Left, Option, Right} from 'funfix-core';

export class OptionUtils {

	/**
	 * Flatten any datatype that extends/inherits a Functor that in itself isn't a HKT
	 * but is a derived HKT
	 */
	static flattenCollection<T>(collection: Collection<any, Option<T>>): Collection<any, T> {
		return collection.filter(v => v.nonEmpty())
			.map(v => v.get());
	}

	static liftEither<T>(opt: Option<T>, left: string): Either<string, T> {
		if (opt.nonEmpty()) {
			return Right(opt.get());
		}
		return Left(left);
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