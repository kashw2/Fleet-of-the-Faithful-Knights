import {JsonBuilder, JsonSerializer, parseString} from "../src";
import {None, Option, Some} from "funfix-core";
import moment from "moment";
import {List} from "immutable";
import {describe, test} from "vitest";

class TestUser {

  constructor(
    private id: Option<string> = None,
    private name: Option<string> = None,
  ) {
  }

  public getId(): Option<string> {
    return this.id;
  }

  public getName(): Option<string> {
    return this.name;
  }

}

class TestUserJsonSerializer extends JsonSerializer<TestUser> {

  static instance: TestUserJsonSerializer = new TestUserJsonSerializer();

  fromJson(json: any): TestUser {
    return new TestUser(
      parseString(json['id']),
      parseString(json['name'])
    );
  }

  toJson(value: TestUser, builder: JsonBuilder): object {
    return builder.addOptional(value.getId(), 'id')
      .addOptional(value.getName(), 'name')
      .build();
  }

}

describe('JsonBuilder', () => {
  test('JsonBuilder should add an item', t => {
    const result = new JsonBuilder().add('world', 'hello').build();
    t.expect(result).toEqual({hello: 'world'});
  });

  test('JsonBuilder should add an optional item', t => {
    const result = new JsonBuilder().addOptional(Some('world'), 'hello').build();
    t.expect(result).toEqual({hello: 'world'});
  });

  test('JsonBuilder should add an optional date', t => {
    const m = moment("2018-06-03");
    const result = new JsonBuilder().addOptionalDate(Some(m), 'time').build();
    t.expect(result).toEqual({time: m});
  });

  test('JsonBuilder should add optional serialized value', t => {
    const result = new JsonBuilder()
      .addOptionalSerialized(Some(new TestUser(Some('Hello'), Some('World'))), 'test_user', TestUserJsonSerializer.instance)
      .build();
    t.expect(result).toEqual({test_user: {id: 'Hello', name: 'World'}});
  });

  test('JsonBuilder should add a List of serialized items', t => {
    const result = new JsonBuilder()
      .addIterableSerialized(
        List.of(
          new TestUser(Some('Hello'), Some('World')),
          new TestUser(Some('Hello'), Some('World'))
        ),
        'test_users',
        TestUserJsonSerializer.instance)
      .build();
    t.expect(result).toEqual({test_users: [{id: 'Hello', name: 'World'}, {id: 'Hello', name: 'World'}]});
  });

  test('JsonBuilder should add a List of items', t => {
    const result = new JsonBuilder()
      .addIterable(List.of('hello', 'world'), 'items')
      .build();
    t.expect(result).toEqual({items: ['hello', 'world']});
  });
});
