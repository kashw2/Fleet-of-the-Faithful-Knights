import { List } from "immutable";

export class StringUtils {

	/**
	 * Capitalises the first letter of each word in a string
	 *
	 * Ex: This is a test sentence -> This Is A Test Sentence
	 *
	 * This is in essence _s.capitalize
	 */
	static toTitleCase(str: string, regExMatch: boolean = false): string {
		if (regExMatch) {
			return str.replace(/(^\w|\s\w)/g, match => match.toUpperCase());
		}
		const strings = List(str.toLowerCase().split(' '));
		return strings.map(s => s.charAt(0).toUpperCase().concat(s.substring(1)))
			.join(' ');
	}




}