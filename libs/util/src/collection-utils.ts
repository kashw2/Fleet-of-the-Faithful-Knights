import {Collection, List, Map} from 'immutable';
import {Option} from 'funfix-core';

export class CollectionUtils {


  /**
   * Builds a new Map<A, B> from any given collection using a key generated from the collection
   *
   * TLDR: Allows you to create a Map of x => y using a field name from the Collection as a key
   */
  static buildKeyedMap<K, V>(input: Collection<any, V>, f: (v: V) => Option<K>): Map<K, V> {
    return input.filter(v => f(v).nonEmpty())
      .map<[K, V]>(v => [f(v).get(), v])
      .reduce((acc, [k, v]) => acc.set(k, v), Map());
  }

  /**
   * Builds a new Map<A, List<B>> from any given collection using a key generated from the collection
   *
   * TLDR: Allows you to create a Map of x => List using a field name from the Collection as a key
   */
  static buildKeyedMapList<A, B>(collection: Collection<any, B>, f: (v: B) => Option<A>): Map<A, List<B>> {
    return collection.filter(v => f(v).nonEmpty())
      .groupBy(v => f(v).get())
      .map(v => v.toList())
      .toMap();
  }

  /**
   * Takes a given collection (assumes a functor) and transforms the contents into a Monad inside of a HKT
   */
  static optionify<A>(collection: Collection<any, A>): Collection<any, Option<A>> {
    return collection.map(v => Option.of(v));
  }

}
