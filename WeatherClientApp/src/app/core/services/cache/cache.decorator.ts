// WEATHER
import { CacheOptions, CacheService } from './index';


/**
 * interface to be implemented once any class wants use cache
 */
export interface Cacheable {
	cacheService: CacheService;
}

/**
 *  decorator for caching methods results
 * @type {(params?: CacheOptions) => (target: Cacheable, propertyKey: string, descriptor: any) => void}
 */
export const CacheMe = cacheDecorator();

/**
 *  custom decorator to be used for results caching
 * @returns {(params?: CacheOptions) => (target: Cacheable, propertyKey: string, descriptor: any) => void}
 */
function cacheDecorator() {
	return (params?: CacheOptions) => {
		return (target: Cacheable, propertyKey: string, descriptor: any) => {
			// save original method
			const method = descriptor.value;

			descriptor.value = function overrideDescriptorValue(...args: any[]) {
				if (this as Cacheable) {
					const cacheKey = createUniqueKey(target.constructor.name, propertyKey, arguments);
					return this.cacheService.get(cacheKey, method.apply(this, arguments), params ? params.maxAge : null);
				}

				// call to original method
				return method.apply(this, arguments);
			};
		};
	};
}

/**
 * creates unique key for cache - takes class name + method name + serialized method parameters
 * @param {string} className - class name
 * @param {string} methodName - method name
 * @param params - method params
 * @returns {string} - unique key
 */
function createUniqueKey(className: string, methodName: string, params: any): string {
	return `${className}.${methodName}.${JSON.stringify(params)}`;
}
