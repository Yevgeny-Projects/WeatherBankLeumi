// NG
import { Injectable } from '@angular/core';

// VENDOR
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// WEATHER
import { CacheOptions } from '@core/services/cache/cache-options';

interface CacheContent {
	expiry: number;
	value: any;
}

@Injectable({providedIn: 'root'})
/**
 *  cache service to store values in memory for reuse
 */
export class CacheService {
	public readonly DEFAULT_MAX_AGE: number = new CacheOptions().maxAge;
	private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
	private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();

	/**
	 *  Gets the value from cache if the key is provided.
	 * If no value exists in cache, then check if the same call exists
	 * in flight, if so return the subject. If not create a new
	 * Subject inFlightObservable and return the source observable.
	 * @param {string} key - cache key
	 * @param {Observable<any>} fallback - method that returns Observable to execute once there is no value in cache
	 * @param {number} maxAge - number in milliseconds added to now()
	 * @returns {Observable<any> | Subject<any>}
	 */
	public get(key: string, fallback?: Observable<any>, maxAge?: number): Observable<any> | Subject<any> {

		if (this.hasValidCachedValue(key)) {
			return of(this.cache.get(key).value);
		}

		if (!maxAge) {
			maxAge = this.DEFAULT_MAX_AGE;
		}

		if (this.inFlightObservables.has(key)) {
			return this.inFlightObservables.get(key);
		} else if (fallback && fallback instanceof Observable) {
			this.inFlightObservables.set(key, new Subject());
			return fallback.pipe(
				tap((value) => {
					this.set(key, value, maxAge);
				}),
				catchError((e: any) => { // `fallback` are crashed
					// crashed flight is terrible, it's better to clean it up...
					this.inFlightObservables.delete(key);
					// and when we have done our job, it's good idea to let the others know this event.
					// maybe they have their stuffs need to be done too.
					return throwError(e);
				})
			);
		}

		return throwError('Requested key is not available in Cache');
	}

	/**
	 * Sets the value with key in the cache
	 * Notifies all observers of the new value
	 * @param {string} key - cache key
	 * @param value - cache value
	 * @param {number} maxAge - number in milliseconds added to now()
	 */
	public set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
		this.cache.set(key, {value, expiry: Date.now() + maxAge});
		this.notifyInFlightObservers(key, value);
	}

	/**
	 * Checks if the a key exists in cache
	 * @param {string} key - cache key
	 * @returns {boolean} - true - if value exists in cache
	 */
	public has(key: string): boolean {
		return this.cache.has(key);
	}

	/**
	 * Publishes the value to all observers of the given
	 * in progress observables if observers exist.
	 * @param {string} key - cache key
	 * @param value - void
	 */
	private notifyInFlightObservers(key: string, value: any): void {
		if (this.inFlightObservables.has(key)) {
			const inFlight = this.inFlightObservables.get(key);
			const observersCount = inFlight.observers.length;
			if (observersCount) {
				inFlight.next(value);
			}
			inFlight.complete();
			this.inFlightObservables.delete(key);
		}
	}

	/**
	 * Checks if the key exists and   has not expired.
	 * @param {string} key - cache key
	 * @returns {boolean} - true - if cached value is valid, otherwise - false
	 */
	private hasValidCachedValue(key: string): boolean {
		if (this.cache.has(key)) {
			if (this.cache.get(key).expiry < Date.now()) {
				this.cache.delete(key);
				return false;
			}
			return true;
		} else {
			return false;
		}
	}
}
