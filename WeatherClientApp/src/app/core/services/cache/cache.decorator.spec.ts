// NG
import { TestBed } from '@angular/core/testing';

// WEATHER
import { Cacheable, CacheMe, CacheService } from './index';

describe('Cache Decorator', () => {

	class Fake implements Cacheable {
		constructor(public cacheService: CacheService) {
		}

		@CacheMe({maxAge: 10})
		public fakeMethod(param) {
			return param;
		}
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CacheService],
		});

		this.cacheService = TestBed.get(CacheService);

		jest.spyOn(this.cacheService, 'get').mockReturnValue('value from cache');

		this.result = new Fake(this.cacheService).fakeMethod(1);

	});

	it('should return value from cache', () => {
		expect(this.result).toBe('value from cache');
	});

	it('should call to cacheService with correct key', () => {
		expect(this.cacheService.get).toHaveBeenCalledWith('Fake.fakeMethod.{"0":1}', 1, 10);
	});
});
