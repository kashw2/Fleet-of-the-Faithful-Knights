import {Collection, List, Set} from 'immutable';
import {Either, Left, Option, Right} from 'funfix-core';

export class OptionUtils {

	static exists2<A, B>(o1: Option<A>, o2: Option<B>, f: (oa: A, ob: B) => boolean): boolean {
		if (o1.nonEmpty() && o2.nonEmpty()) {
			return f(o1.get(), o2.get());
		}
		return false;
	}

	/**
	 * Flatten any datatype that extends/inherits a Functor that in itself isn't a HKT
	 * but is a derived HKT
	 */
	static flattenCollection<T>(collection: Collection<any, Option<T>>): Collection<any, T> {
		return collection.filter(v => v.nonEmpty())
			.map(v => v.get());
	}

	static flattenList<T>(list: List<Option<T>>): List<T> {
		return list.filter(v => v.nonEmpty())
			.map(v => v.get());
	}

	static flattenSet<T>(set: Set<Option<T>>): Set<T> {
		return set.filter(v => v.nonEmpty())
			.map(v => v.get());
	}

	static liftEither<T>(opt: Option<T>, left: string): Either<string, T> {
		if (opt.nonEmpty()) {
			return Right(opt.get());
		}
		return Left(left);
	}

}