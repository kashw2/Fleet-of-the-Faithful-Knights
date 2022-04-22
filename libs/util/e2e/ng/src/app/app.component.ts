import {Component, OnInit} from '@angular/core';
import {OptionUtils} from "@kashw2/lib-util";
import {Option, Some} from "funfix-core";
import {List, Set} from "immutable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng';

  ngOnInit(): void {

    /**
     * In theory, you should only need to test one class and one method from the specific library in order to know it will work...
     */
    OptionUtils.when(true, () => "Hello World ((OptionUtil.when)").forEach(console.info);
    OptionUtils.exists2(Some('Hello'), Some('World'), (a: string, b: string) => {
      console.info(`${a} ${b} (OptionUtil.exists2)`);
      return true;
    });
    OptionUtils.flattenCollection(List.of(Option.of("Hello"), Option.of("World"))).forEach((v: string) => console.log(`${v} (OptionUtil.flattenCollection)`));
    OptionUtils.toSet(Option.of("Hello"), Option.of("World")).forEach((v: string) => console.log(`${v} (OptionUtil.toSet)`));
    OptionUtils.toList(Option.of("Hello"), Option.of("World")).forEach((v: string) => console.log(`${v} (OptionUtil.toList)`));
    OptionUtils.flattenList(List.of(Option.of("Hello"), Option.of("World"))).forEach((v: string) => console.log(`${v} (OptionUtils.flattenList)`));
    OptionUtils.flattenSet(Set.of(Option.of("Hello"), Option.of("World"))).forEach((v: string) => console.log(`${v} (OptionUtils.flattenSet)`));
    OptionUtils.sequence(Option.of(Promise.resolve(Option.of("Hello"))))
    OptionUtils.toEither(Option.of("Hello World"), "Error");

  }
}
