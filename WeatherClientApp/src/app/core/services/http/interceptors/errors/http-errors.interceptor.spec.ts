// NG
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// WEATHER
import { HttpModule } from './../../index';
import { HttpErrorsInterceptor } from './index';

describe('HttpErrorsInterceptor', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
				HttpClientTestingModule,
			],
			providers: [HttpClient,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: HttpErrorsInterceptor,
					multi: true,
				}],
		});

		this.http = TestBed.get(HttpClient);
		this.httpMock = TestBed.get(HttpTestingController);
	});

	describe('http error validations', () => {
		beforeEach(() => {
			this.dataUrl = '/fake';
			this.response = null;
			this.errorResposne = null;

			// make call to some data URL
			this.http.get(this.dataUrl)
				.subscribe((response) => {
						this.response = response;
					},
					(error) => {
						this.errorResposne = error;
					});
			this.request = this.httpMock.expectOne(this.dataUrl, 'send some data to server');
		});

		afterEach(() => {
			this.httpMock.verify();
		});

		describe('404 error', () => {
			beforeEach(() => {
				this.request.flush('Invalid request parameters', {
					status: 404,
					statusText: 'Bad Request',
				});
			});

			it('should return 404 status', () => {
				expect(this.errorResposne.status).toBe(404);
			});

			it('should return status text', () => {
				expect(this.errorResposne.error).toBe('Invalid request parameters');
			});


		});

		describe('default', () => {
			beforeEach(() => {
				this.request.flush('default error', {
					status: 999,
					statusText: 'Default error',
				});
			});

			it('should return 999 status', () => {
				expect(this.errorResposne.status).toBe(999);
			});

			it('should return status text', () => {
				expect(this.errorResposne.error).toBe('default error');
			});
		});
	});
});
