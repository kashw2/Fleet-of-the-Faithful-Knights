import {None, Option} from "funfix-core";
import {List, Set} from "immutable";

export class OptionUtils {

    static deepEffector<A, B>(opt: Option<A>, f: (v: A) => Option<B>): Option<B> {
        return opt.flatMap(v => f(v));
    }

    static exists2<A, B, C>(opt1: Option<A>, opt2: Option<B>, f: (a: A, b: B) => boolean): boolean {
        if (opt1.nonEmpty() && opt2.nonEmpty()) {
            return f(opt1.get(), opt2.get());
        }
        return false;
    }

    static flattenList<A>(list: List<Option<A>>): List<A> {
        return list.filterNot(x => x.isEmpty())
            .map(x => x.get());
    }

    static flattenSet<A>(set: Set<Option<A>>): Set<A> {
        return set.filterNot(x => x.isEmpty())
            .map(x => x.get());
    }

    static toList<A>(opt: Option<List<A>>): List<A> {
        return opt.getOrElse(List());
    }

}
