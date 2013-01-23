/*jshint strict:false */
/*globals describe it IO assert console */
describe('XD - Errors', function () {
	var BASE_URL = location.protocol + '//' + location.hostname + ':' + (parseInt(location.port, 10) + 1);
	
	
	it('should not be this "' + BASE_URL + '"', function () {
		assert.strictEqual(location.href.indexOf(BASE_URL), -1);
	});
	
	
	/**
	 * GET
	 */
	describe('GET', function () {
		it('should return a error (400)', function (done) {
			IO('get', BASE_URL + '/error/400', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		
		it('should return a error (500)', function (done) {
			IO('get', BASE_URL + '/error/500', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		it('should return a error (timeout)', function (done) {
			IO('get', BASE_URL + '/timeout', null, {
				timeout: 500,
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_TIMEOUT);
					done();
				}
			});
		});
	});
	
	
	/**
	 * POST
	 */
	describe('POST', function () {
		it('should return a error (400)', function (done) {
			IO('post', BASE_URL + '/error/400', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		
		it('should return a error (500)', function (done) {
			IO('post', BASE_URL + '/error/500', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});

		it('should return a error (timeout)', function (done) {
			IO('post', BASE_URL + '/timeout', null, {
				timeout: 500,
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_TIMEOUT);
					done();
				}
			});
		});
	});
});