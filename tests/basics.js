/*jshint strict:false */
/*globals describe it IO assert console */
describe('Basics', function () {
	/**
	 * GET
	 */
	describe('GET', function () {
		it('should return contents of test1.txt', function (done) {
			var expected = ['foo', 'bar', 'baz'].join('\n');
			IO('get', '/response/test1.txt', null, {
				contentType: 'text/plain',
				callback: function (err, res, xhr) {
					if (err) {
						throw err;
					}
					assert.strictEqual(res, expected);
					done();
				}
			});
		});
		
		it('should return contents of test1.json', function (done) {
			var expected = {
					"foo": "bar"
				};
			IO('get', '/response/test1.json', null, {
				contentType: 'application/json',
				callback: function (err, res, xhr) {
					if (err) {
						throw err;
					}
					assert.objectStrictEqual(JSON.parse(res), expected);
					done();
				}
			});
		});
	});
	
	
	/**
	 * POST
	 */
	describe('POST', function () {
		it('should echo back the sent FORM data', function (done) {
			var send = {
				"foo": "bar"
			};
			
			IO('post', '/', send, {
				contentType: 'application/x-www-form-urlencoded',
				callback: function (err, res, xhr) {
					if (err) {
						throw err;
					}
					assert.objectStrictEqual(JSON.parse(res), send);
					done();
				}
			});
		});
		
		it('should echo back the sent JSON data', function (done) {
			var send = {
					"foo": "bar"
				};
			
			IO('post', '/', JSON.stringify(send), {
				contentType: 'application/json',
				callback: function (err, res, xhr) {
					if (err) {
						throw err;
					}
					assert.objectStrictEqual(JSON.parse(res), send);
					done();
				}
			});
		});
	});	
});