// NG
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// VENDOR
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Http interceptor to monitor siq xsrf response header and add it to each request header
 */
@Injectable({
	providedIn: 'root'
})
export class XsrfInterceptor implements HttpInterceptor {

	private xsrfTokenName = 'siq-xsrf-token';
	private xsrfTokenValue: string = null;

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let headers = request.headers;

		// add token if exists
		if (this.xsrfTokenValue) {
			headers = request.headers.append(this.xsrfTokenName, this.xsrfTokenValue);
		}
		const customReq = request.clone({
			headers,
		});

		return next
			.handle(customReq).pipe(
				tap((ev: HttpEvent<any>) => {
					if (ev instanceof HttpResponse && ev.headers.has(this.xsrfTokenName)) {
						// save the token value if comes from server response
						this.xsrfTokenValue = ev.headers.get(this.xsrfTokenName);
					}
				}));
	}
}
