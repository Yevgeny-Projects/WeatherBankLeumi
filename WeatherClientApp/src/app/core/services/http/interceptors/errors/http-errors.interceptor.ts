// NG
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// VENDOR
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
/**
 *  http errors interceptor
 */
export class HttpErrorsInterceptor implements HttpInterceptor {

	constructor() {
		// inject any external service using injector - private injector: Injector; this.injector.get(Any_Service_Type)
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req.clone()).pipe(catchError((response: HttpErrorResponse) => {
			switch (response.status) {
				case 412:
				// should route to access-deny page
				case 400:
				case 401:
				case 403:
				case 404:
				case 405:
				case 500:
					return throwError(response);
				default:
					return throwError(response);
			}
		}));
	}
}
