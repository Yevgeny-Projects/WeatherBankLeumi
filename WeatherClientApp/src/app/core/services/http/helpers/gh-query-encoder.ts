// NG
import {HttpUrlEncodingCodec} from '@angular/common/http';

/**
 * Custom encoder to escape query parameters on http requests, workaround for known Angular open issue:
 * https://github.com/angular/angular/issues/11058
 */
export class GhQueryEncoder extends HttpUrlEncodingCodec {
	public encodeKey(k: string): string {
		k = super.encodeKey(k);
		return k.replace(/\+/gi, '%2B');
	}
	public encodeValue(v: string): string {
		v = super.encodeKey(v);
		return v.replace(/\+/gi, '%2B');
	}
}
