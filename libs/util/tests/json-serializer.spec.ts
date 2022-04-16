import test from "ava";
import {None, Option, Some} from "funfix";
import {JsonBuilder, JsonSerializer, parseString} from "../src";

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

test('JsonSerializer should convert from obj to type', t => {
    const result = TestUserJsonSerializer.instance.fromJson(testUserObject['test_user']);
    t.deepEqual(result, new TestUser(Some('hello'), Some('world')));
});

test('JsonSerializer should convert from type to object', t => {
    const result = TestUserJsonSerializer.instance.toJson(new TestUser(Some('hello'), Some('world')), new JsonBuilder());
    t.deepEqual(result, testUserObject['test_user']);
});

test('JsonSerializer should convert from array to array of type', t => {
    const result = TestUserJsonSerializer.instance.fromJsonArray([testUserObject['test_user'], testUserObject['test_user']]).toArray();
    t.deepEqual(result, [new TestUser(Some('hello'), Some('world')), new TestUser(Some('hello'), Some('world'))]);
});

test('JsonSerializer should convert from list of type array', t => {
    const result = TestUserJsonSerializer.instance.toJsonArray([new TestUser(Some('hello'), Some('world')), new TestUser(Some('hello'), Some('world'))]);
    t.deepEqual(result, [{id: 'hello', name: 'world'}, {id: 'hello', name: 'world'}]);
});

test('JsonSerializer should convert from type to json string', t => {
    const result = TestUserJsonSerializer.instance.toJsonString(TestUserJsonSerializer.instance.fromJson(testUserObject['test_user']));
    t.deepEqual(result, '{"id":"hello","name":"world"}');
});

test('JsonSerializer should convert from type to json string array', t => {
    const result = TestUserJsonSerializer.instance.toJsonStringArray([new TestUser(Some('hello'), Some('world')), new TestUser(Some('hello'), Some('world'))]).replace(/(\r\n|\n|\r)/gm, "");
    t.deepEqual(result, '[  {    "id": "hello",    "name": "world"  },  {    "id": "hello",    "name": "world"  }]');
});