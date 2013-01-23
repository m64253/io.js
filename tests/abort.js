/*jshint strict:false */
/*globals describe it IO assert console */
describe('Abort', function () {
	/**
	 * GET
	 */
	describe('GET', function () {
		it('should abort directly', function (done) {
			IO('get', '/timeout', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_ABORT);
					done();
				}
			}).abort();
		});
		
		it('should abort after 500ms', function (done) {
			var xhr = IO('get', '/timeout', null, {
					callback: function (err, res, xhr) {
						assert.isError(err);
						assert.strictEqual(err.type, IO.ERROR_ABORT);
						done();
					}
				});
			
			setTimeout(function () {
				xhr.abort();
			}, 500);
		});
	});
	
	
	/**
	 * POST
	 */
	describe('POST', function () {
		it('should abort directly', function (done) {
			IO('post', '/timeout', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_ABORT);
					done();
				}
			}).abort();
		});
		
		it('should abort after 500ms', function (done) {
			var xhr = IO('post', '/timeout', null, {
					callback: function (err, res, xhr) {
						assert.isError(err);
						assert.strictEqual(err.type, IO.ERROR_ABORT);
						done();
					}
				});
			
			setTimeout(function () {
				xhr.abort();
			}, 500);
		});
	});
});