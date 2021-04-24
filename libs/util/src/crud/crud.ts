/**
 * Crud represents Create Read Update and Delete functionality
 *
 * Features methods facilitating CRUD in both a serialized and normative manner
 *
 */
import {JsonSerializer} from '../json-serializer';
import {Option} from 'funfix-core';

export abstract class Crud {

	public abstract create(key: string, value: string): boolean;

	public createSerialized<T>(
		key: string,
		value: T,
		serializer: JsonSerializer<T>
	): boolean {
		return this.create(key, serializer.toJsonString(value));
	}

	public abstract delete(key: string): boolean;

	public abstract read(key: string): Option<string>;

	public readSerialized<T>(key: string, serializer: JsonSerializer<T>): Option<T> {
		return this.read(key)
			.map(v => serializer.fromJsonString(v));
	}

	public abstract update(key: string, value: string): void;

	public updateSerialized<T>(
		key: string,
		value: T,
		serializer: JsonSerializer<T>
	): void {
		return this.update(key, serializer.toJsonString(value));
	}

}
