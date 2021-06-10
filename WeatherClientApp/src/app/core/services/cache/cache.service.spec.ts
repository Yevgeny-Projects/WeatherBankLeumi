// NG
import { TestBed } from '@angular/core/testing';

// VENDOR
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// WEATHER
import { CacheService } from './cache.service';

describe('CacheService', () => {

	let service: CacheService;


	beforeEach(async () => {
		TestBed.configureTestingModule({
			providers: [CacheService],
		});
	});

	beforeEach(() => {
		service = TestBed.get(CacheService);
	});

	it('service should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('verify methods', () => {
		const key = 'key';
		let expectedValue;
		const maxAge = 1;
		beforeEach(() => {
			expectedValue = {a: 1};
		});

		describe('get cache method', () => {
			let fallback;

			describe('cache value not exists in cache', () => {

				let expectedResult;
				beforeEach(() => {
					fallback = of(expectedValue);

					jest.spyOn(service, 'hasValidCachedValue' as any).mockReturnValue(false);
					jest.spyOn(service['inFlightObservables'], 'has').mockReturnValue(false);
					jest.spyOn(service['inFlightObservables'], 'set').mockImplementation();

					jest.spyOn(service, 'set').mockImplementation();

					expectedResult = service.get(key, fallback, maxAge);

					expectedResult.subscribe(() => {
					});
				});

				it('should call to hasValidCachedValue()', () => {
					expect(service['hasValidCachedValue']).toHaveBeenCalledWith(key);
				});

				it('should call to inFlightObservables.has()', () => {
					expect(service['inFlightObservables'].has).toHaveBeenCalledWith(key);
				});

				it('should call to inFlightObservables.set()', () => {
					expect(service['inFlightObservables'].set).toHaveBeenCalledWith(key, new Subject());
				});

				it('should call to set()', () => {
					expect(service.set).toHaveBeenCalledWith(key, expectedValue, maxAge);
				});

				it('verify expected value should be Observable', () => {
					expect(expectedResult instanceof Observable).toBeTruthy();
				});
			});

			describe('cache value not exists in cache - throw error', () => {

				let result: Observable<any> | Subject<any>;
				let errorMessage;
				beforeEach(() => {
					fallback = throwError('Error');

					jest.spyOn(service, 'hasValidCachedValue' as any).mockReturnValue(false);
					jest.spyOn(service['inFlightObservables'], 'delete').mockReturnThis();

					result = service.get(key, fallback, maxAge);
					result
						.pipe(catchError(val => of(val)))
						.subscribe(val => {
							errorMessage = val;
						});
				});

				it('should throw an error', () => {
					expect(errorMessage).toEqual('Error');
				});

				it('should call to inFlightObservables delete', () => {
					expect(service['inFlightObservables'].delete).toHaveBeenCalledWith(key);
				});


			});

			describe('cache value exists in cache', () => {
				let result;
				let expectedResult;
				beforeEach(() => {

					fallback = of(expectedValue);

					jest.spyOn(service, 'hasValidCachedValue' as any).mockReturnValue(false);

					expectedResult = service.get(key, fallback, 1);

					fallback.subscribe((response) => {
						result = response;
					});
				});

				it('should return Observable', () => {
					expect(expectedResult instanceof Observable).toBeTruthy();
				});

				it('should return to result expected value', () => {
					expect(result).toEqual(expectedValue);
				});
			});

			describe('value in cache', () => {
				let result;
				beforeEach(() => {
					jest.spyOn(service, 'hasValidCachedValue' as any).mockReturnValue(true);

					service['cache'].set(key, {value: expectedValue, expiry: Date.now() + 1});

					service.get(key, fallback, 1)
						.pipe(
							take(1)
						)
						.subscribe((response) => {
							result = response;
						});
				});

				it('should call to hasValidCachedValue()', () => {
					expect(service['hasValidCachedValue']).toHaveBeenCalledWith(key);
				});

				it('should return to result expected value', () => {
					expect(result).toEqual(expectedValue);
				});

			});

			describe('observable already in process', () => {
				let result;
				beforeEach(() => {
					jest.spyOn(service, 'hasValidCachedValue' as any).mockReturnValue(false);
					jest.spyOn(service['inFlightObservables'], 'has').mockReturnValue(true);
					jest.spyOn(service['inFlightObservables'], 'get').mockReturnValue(expectedValue);

					result = service.get(key, fallback, 1);
				});

				it('should call to hasValidCachedValue()', () => {
					expect(service['hasValidCachedValue']).toHaveBeenCalledWith(key);
				});

				it('should call to inFlightObservables.has()', () => {
					expect(service['inFlightObservables'].has).toHaveBeenCalledWith(key);
				});

				it('should call to inFlightObservables.get()', () => {
					expect(service['inFlightObservables'].get).toHaveBeenCalledWith(key);
				});

				it('should return to result expected value', () => {
					expect(result).toEqual(expectedValue);
				});

			});

			describe('key is not in the cache', () => {
				let result: Observable<any> | Subject<any>;
				let errorMessage;

				beforeEach(() => {
					jest.spyOn(service, 'hasValidCachedValue' as any).mockReturnValue(false);
					jest.spyOn(service['inFlightObservables'], 'has').mockReturnValue(false);

					result = service.get(key);
					result
						.pipe(catchError(val => of(val)))
						.subscribe(val => {
							errorMessage = val;
						});
				});

				it('should return error', () => {
					expect(errorMessage).toEqual('Requested key is not available in Cache');
				});
			});
		});

		describe('set cache method', () => {
			let now;
			beforeEach(() => {
				jest.spyOn(service, 'notifyInFlightObservers' as any).mockReturnValue(null);
				jest.spyOn(service['cache'], 'set').mockReturnValue(null);
				now = Date.now();
				jest.spyOn(Date, 'now').mockReturnValue(now);

				service.set(key, expectedValue);
			});

			it('should call to notifyInFlightObservers()', () => {
				expect(service['notifyInFlightObservers']).toHaveBeenCalledWith(key, expectedValue);
			});

			it('should call to cache.set()', () => {
				const expiry = now + service.DEFAULT_MAX_AGE;
				expect(service['cache'].set).toHaveBeenCalledWith(key, {value: expectedValue, expiry});
			});

		});

		describe('has method', () => {
			let result;
			beforeEach(() => {

				jest.spyOn(service['cache'], 'has').mockReturnValue(true);

				result = service.has(key);
			});

			it('should call to cache.has()', () => {
				expect(service['cache'].has).toHaveBeenCalledWith(key);
			});

			it('should return true', () => {
				expect(result).toBeTruthy();
			});
		});

		describe('hasValidCachedValue', () => {
			let cacheKey: string;
			let result: boolean;

			describe('key not found', () => {
				beforeEach(() => {
					cacheKey = 'aaa';
					result = service['hasValidCachedValue'](cacheKey);
				});

				it('should be false', () => {
					expect(result).toBeFalsy();
				});
			});

			describe('key not found - expired', () => {
				beforeEach(() => {
					cacheKey = 'aaa';
					service['cache'].set(cacheKey, {value: 1, expiry: Date.now() - service.DEFAULT_MAX_AGE});

					result = service['hasValidCachedValue'](cacheKey);
				});

				it('should be false', () => {
					expect(result).toBeFalsy();
				});
			});

			describe('key found', () => {
				beforeEach(() => {
					cacheKey = 'aaa';
					service['cache'].set(cacheKey, {value: 1, expiry: Date.now() + service.DEFAULT_MAX_AGE});

					result = service['hasValidCachedValue'](cacheKey);
				});

				it('should be true', () => {
					expect(result).toBeTruthy();
				});
			});

		});

		describe('notifyInFlightObservers', () => {
			let cacheKey: string;

			beforeEach(() => {
				jest.spyOn(service['inFlightObservables'], 'delete').mockImplementation();

				cacheKey = 'aaa';
				service['inFlightObservables'].set(cacheKey, new Subject<any>());
				service['notifyInFlightObservers'](cacheKey, 1);
			});

			it('should call to delete', () => {
				expect(service['inFlightObservables'].delete).toHaveBeenCalledWith(cacheKey);
			});
		});

	});
});
