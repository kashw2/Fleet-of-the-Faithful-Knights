import {None, Option} from "funfix-core";
import {List} from "immutable";

export class OptionUtils {

    static flattenList<A>(list: List<Option<A>>): List<A> {
        return list.filterNot(x => x.isEmpty())
            .map(x => x.get());
    }

}
