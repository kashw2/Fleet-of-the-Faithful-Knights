import test from "ava";
import {ApiBase} from "../src";
import {Right} from "funfix-core";

test('should remove endpoint / from base with ending /', t => {
  const result = new ApiBase('https://www.example.com/').getFullUrl('/endpoint');
  t.is(result, 'https://www.example.com/endpoint');
});

test('should add / to endpoint where base with not ending with /', t => {
  const result = new ApiBase('https://www.example.com').getFullUrl('endpoint');
  t.is(result, 'https://www.example.com/endpoint');
});

test('should add / to endpoint where base with not ending with / when endpoint starts with /', t => {
  const result = new ApiBase('https://www.example.com').getFullUrl('/endpoint');
  t.is(result, 'https://www.example.com/endpoint');
});

test('should remove whitespace in url', t => {
  const result = new ApiBase('http://localhost:3000  ').getFullUrl('/endpoint');
  t.is(result, 'http://localhost:3000/endpoint');
});

test('should map over Future value', async t => {
  const base = new ApiBase('https://jsonplaceholder.typicode.com');
  const result = await base.sendRequest('/albums/1', 'GET');
  /**
   * The typesystem gets this wrong here. As Future extends Promise, awaiting it removes the 'Future' wrapper around its value making its true type:
   * `Either<string, any>`.
   *
   * .map() works as Either still has a map function
   */
  // result.map(v => {
  //     t.deepEqual(v, {
  //         "userId": 1,
  //         "id": 1,
  //         "title": "quidem molestiae enim"
  //     });
  // });
  t.deepEqual(result, Right({
    "userId": 1,
    "id": 1,
    "title": "quidem molestiae enim"
  }));
});

test('should fail when a future value is returned', async t => {
  const base = new ApiBase('https://jsonplaceholder.typicode.com');
  const result = await base.sendRequest('/albums/1', 'POST');
  /**
   * The typesystem gets this wrong here. As Future extends Promise, awaiting it removes the 'Future' wrapper around its value making its true type:
   * `Either<string, any>`.
   */
  t.is(result.isLeft(), true);
});