// NG
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

// VENDOR
import { Observable } from 'rxjs';

// WEATHER
import {GhQueryEncoder} from '@core/services/http/helpers/gh-query-encoder';

@Injectable()
/**
 * base HTTP service - abstract class that encapsulates HTTP access logic
 */
export abstract class BaseHttpService {
	private http: HttpClient;
	private readonly headers: HttpHeaders;
	private readonly baseApiUrl = '/weatherWeb/';

	protected constructor(protected injector: Injector) {
		this.http = this.injector.get(HttpClient);
		this.headers = this.buildHeaders();
	}

	public get baseUrl() {
		return this.baseApiUrl;
	}

	/**
	 * HTTP GET method
	 * @param {string} url - relative url
	 * @param {object} params - any parameters to be send via URL
	 * @returns {Observable<T>} - generics observable
	 */
	public get<T>(url: string, params?: object): Observable<T> {
		return this.http.get<T>(this.baseApiUrl + url, {
			headers: this.headers,
			params: this.buildParameters(params),
		});
	}

	/**
	 * HTTP POST method
	 * @param {string} url - relative url
	 * @param body - any parameters to be send as body
	 * @param {object} params - any parameters to be send via URL
	 * @param {HttpHeaders} customHeaders - custom headers to user in the request.
	 * @returns {Observable<T>} - generics observable
	 */
	public post<T>(url: string, body?: any, params?: object, customHeaders?: HttpHeaders): Observable<T> {
		return this.http.post<T>(this.baseApiUrl + url, body, {
			headers:  customHeaders ? customHeaders : this.headers,
			params: this.buildParameters(params),
		});
	}

	/**
	 * HTTP PUT method
	 * @param {string} url - relative url
	 * @param body - any parameters to be send as body
	 * @param {object} params - any parameters to be send via URL
	 * @returns {Observable<T>} - generics observable
	 */
	public put<T>(url: string, body?: any, params?: object): Observable<T> {
		return this.http.put<T>(this.baseApiUrl + url, body, {
			headers: this.headers,
			params: this.buildParameters(params),
		});
	}

	/**
	 * @param {string} url - relative url
	 * @param body - any parameters to be send as body
	 * @param {object} params - any parameters to be send via URL
	 * @returns {Observable<T>} - generics observable
	 */
	public patch<T>(url: string, body?: any, params?: object): Observable<T> {
		return this.http.patch<T>(this.baseApiUrl + url, body, {
			headers: this.headers,
			params: this.buildParameters(params),
		});
	}

	/**
	 * @param {string} url - relative url
	 * @param {object} params - any parameters to be send via URL
	 * @returns {Observable<T>} - generics observable
	 */
	public delete<T>(url: string, params?: object): Observable<T> {
		return this.http.delete<T>(this.baseApiUrl + url, {
			headers: this.headers,
			params: this.buildParameters(params),
		});
	}

	/**
	 * build custom headers to be added to each request
	 * @returns {HttpHeaders} - new HttpHeaders instance
	 */
	private buildHeaders(): HttpHeaders {
		return new HttpHeaders()
			.append('Content-Type', 'application/json');
	}

	/**
	 * build HttpParams instance to be used in URL
	 * @param {object} data - any object
	 * @returns {HttpParams} - new HttpParams instance
	 */
	private buildParameters(data?: object): HttpParams {
		let httpParams = new HttpParams( {encoder: new GhQueryEncoder()});
		if (data) {
			Object.keys(data).forEach((key) => {
				httpParams = httpParams.append(key, data[key]);
			});
		}
		return httpParams;
	}
}

