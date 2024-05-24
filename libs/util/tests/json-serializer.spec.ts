import {None, Option, Some} from "funfix-core";
import {JsonBuilder, JsonSerializer, parseString} from "../src";
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

const testUserObject = {test_user: {id: 'hello', name: 'world'}};

describe('JsonSerializer', () => {
  test('JsonSerializer should convert from obj to type', t => {
    const result = TestUserJsonSerializer.instance.fromJson(testUserObject['test_user']);
    t.expect(result).toEqual(new TestUser(Some('hello'), Some('world')));
  });

  test('JsonSerializer should convert from type to object', t => {
    const result = TestUserJsonSerializer.instance.toJson(new TestUser(Some('hello'), Some('world')), new JsonBuilder());
    t.expect(result).toEqual(testUserObject['test_user']);
  });

  test('JsonSerializer should convert from type to object (impl)', t => {
    const result = TestUserJsonSerializer.instance.toJsonImpl(new TestUser(Some('hello'), Some('world')));
    t.expect(result).toEqual(testUserObject['test_user']);
  });

  test('JsonSerializer should convert from array to array of type', t => {
    const result = TestUserJsonSerializer.instance.fromJsonArray([testUserObject['test_user'], testUserObject['test_user']]).toArray();
    t.expect(result).toEqual([new TestUser(Some('hello'), Some('world')), new TestUser(Some('hello'), Some('world'))]);
  });

  test('JsonSerializer should convert from list of type array', t => {
    const result = TestUserJsonSerializer.instance.toJsonArray([new TestUser(Some('hello'), Some('world')), new TestUser(Some('hello'), Some('world'))]);
    t.expect(result).toEqual([{id: 'hello', name: 'world'}, {id: 'hello', name: 'world'}]);
  });

  test('JsonSerializer should convert from type to json string', t => {
    const result = TestUserJsonSerializer.instance.toJsonString(TestUserJsonSerializer.instance.fromJson(testUserObject['test_user']));
    t.expect(result).toEqual('{"id":"hello","name":"world"}');
  });

  test('JsonSerializer should convert from type to json string array', t => {
    const result = TestUserJsonSerializer.instance.toJsonStringArray([new TestUser(Some('hello'), Some('world')), new TestUser(Some('hello'), Some('world'))]).replace(/(\r\n|\n|\r)/gm, "");
    t.expect(result).toEqual('[  {    "id": "hello",    "name": "world"  },  {    "id": "hello",    "name": "world"  }]');
  });

  test('JsonSerializer should convert from object string to type', t => {
    const result = TestUserJsonSerializer.instance.fromJsonString(TestUserJsonSerializer.instance.toJsonString(new TestUser(Some('hello'), Some('world'))));
    t.expect(result).toEqual(Some(new TestUser(Some('hello'), Some('world'))));
  });
});
