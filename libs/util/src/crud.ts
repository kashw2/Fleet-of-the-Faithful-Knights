import {JsonSerializer} from './json-serializer';
import {Option} from 'funfix-core';

export class Crud<T> {

	public create(key: string, value: string): void {
		return localStorage.setItem(key, value);
	}

	public createSerialized(key: string, value: T, serializer: JsonSerializer<T>): boolean {
		localStorage.setItem(key, serializer.toJsonString(value));
		return this.read(key).nonEmpty();
	}

	public delete(key): boolean {
		localStorage.removeItem(key);
		return Option.of(localStorage.getItem(key)).isEmpty();
	}

	public read(key: string): Option<string> {
		return Option.of(localStorage.getItem(key));
	}

	public readSerialized(key: string, serializer: JsonSerializer<T>): Option<T> {
		return Option.of(localStorage.getItem(key))
			.flatMap(v => serializer.fromJsonImpl(JSON.parse(v)));
	}

	public update(key: string, value: string): void {
		return localStorage.setItem(key, value);
	}

	public updateSerializer(key: string, value: T, serializer: JsonSerializer<T>): void {
		return localStorage.setItem(key, serializer.toJsonString(value));
	}

}