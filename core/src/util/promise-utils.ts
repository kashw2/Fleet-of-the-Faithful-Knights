import {None, Option, Some} from "funfix-core";

export class PromiseUtils {

    static async deliverPromiseOption<A>(opt: Option<Promise<A>>): Promise<Option<A>> {
        if (opt.nonEmpty()) {
            return  Promise.resolve(Option.of(await opt.get()));
        }
        return None;
    }

}
