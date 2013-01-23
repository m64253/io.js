/*jshint strict:false */
/*globals describe it IO assert console */
describe('Errors', function () {
	/**
	 * GET
	 */
	describe('GET', function () {
		it('should return a error (400)', function (done) {
			IO('get', '/error/400', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		
		it('should return a error (500)', function (done) {
			IO('get', '/error/500', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		it('should return a error (timeout)', function (done) {
			IO('get', '/timeout', null, {
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
			IO('post', '/error/400', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		
		it('should return a error (500)', function (done) {
			IO('post', '/error/500', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_NETWORK);
					done();
				}
			});
		});
		
		it('should return a error (timeout)', function (done) {
			IO('post', '/timeout', null, {
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