const typeCache: { [label: string]: boolean } = {};
const JESUS_TIME = 621355968000000000;

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels are unique.
 *
 * @param label
 */
export function type<T>(label: T | ''): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unique"`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}

/**
 * Specifies a function that defines the sort order.
 * If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.
 */
export const sortBy = (key) => {
	return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};

/**
 * convert Datetime from local to UTC
 * @param date
 */
export function convertLocalDateToUTCDate(date: Date = new Date()): Date {
	let convertedDate: number;
	// Local time converted to UTC
	const localOffset = date.getTimezoneOffset() * 60000;
	const localTime = date.getTime();
	convertedDate = localTime + localOffset;

	return new Date(convertedDate);
}

/**
 * convert Datetime from UTC to local
 * @param date
 */
export function convertUTCDateToLocalDate(date: Date = new Date()): Date {
	let convertedDate: number;
	const localOffset = date.getTimezoneOffset() * 60000;
	const localTime = date.getTime();
	convertedDate = localTime - localOffset;

	return new Date(convertedDate);
}

/**
 * convert a Date object to epoch time stamp
 * @param date
 */
export function epochTicks(date) {
	return (date.valueOf() * 10000) + JESUS_TIME; // epoch ticks
}

/**
 * EpochTimeStamp utc
 * @param date
 */
export function epochTicksUTC(date: Date) {
	return epochTicks(convertLocalDateToUTCDate(date));
}

/**
 * convert EpochTimeStamp to Date object
 * @param date
 */
export function convertEpochTicksToDate(date: any) {
	return Date.parse(date) ? new Date(date) : new Date((Number(date) - JESUS_TIME) / 10000);
}

/* istanbul ignore next */
export function noop() {
	// No operation performed.
}
