// WEATHER
import { GhQueryEncoder } from '@core/services/http/helpers/gh-query-encoder';

describe('GhQueryEncoder', () => {

	let encoder: GhQueryEncoder;
	beforeEach(() => {
		encoder = new GhQueryEncoder();
	});

	describe('encodeKey', () => {

		let output: string;

		beforeEach(() => {
			output = encoder.encodeKey('http://www.test.com?param=Read+Execute');
		});

		it('should encode key', () => {
			expect(output).toEqual('http://www.test.com?param=Read%2BExecute');
		});

	});

	describe('encodeValue', () => {
		let output: string;

		beforeEach(() => {
			output = encoder.encodeValue('http://www.test.com?param=Read+Execute');
		});

		it('should encode value', () => {
			expect(output).toEqual('http://www.test.com?param=Read%2BExecute');
		});
	});
});
