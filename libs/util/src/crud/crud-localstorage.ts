import {Option} from 'funfix-core';
import {Crud} from './crud';

/**
 * Crud Functionality using LocalStorage
 */
export class CrudLocalStorage extends Crud {

	public create(key: string, value: string): boolean {
		localStorage.setItem(key, value);
		return this.read(key).nonEmpty();
	}

	public delete(key: string): boolean {
		localStorage.removeItem(key);
		return Option.of(localStorage.getItem(key)).isEmpty();
	}

	public read<T>(key: string): Option<string> {
		return Option.of(localStorage.getItem(key));
	}

	public update(key: string, value: string): void {
		return localStorage.setItem(key, value);
	}

}