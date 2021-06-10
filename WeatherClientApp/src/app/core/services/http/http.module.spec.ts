// NG
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// WEATHER
import { BaseHttpService, HttpModule } from './';

describe(`HttpModule`, () => {

	describe('verify provider', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [HttpModule],
			});
		});

		it(`should not provide 'BaseHttpService' service`, () => {
			expect(() => TestBed.get(BaseHttpService)).toThrowError(/No provider for/);
		});
	});

	describe(`HttpModule.forRoot()`, () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [
					HttpModule.forRoot(),
					HttpClientTestingModule
				],
				providers: [
					BaseHttpService,
					HttpClient],
			});
			this.service = TestBed.get(BaseHttpService);
		});

		it(`should provide services`, () => {
			expect(this.service).toBeTruthy();
		});
	});
});
