/*jshint strict:false */
/*globals describe it IO assert console */
describe('XD - Abort', function () {
	var BASE_URL = location.protocol + '//' + location.hostname + ':' + (parseInt(location.port, 10) + 1);
	
	
	it('should not be this "' + BASE_URL + '"', function () {
		assert.strictEqual(location.href.indexOf(BASE_URL), -1);
	});
	
	/**
	 * GET
	 */
	describe('GET', function () {
		it('should abort directly', function (done) {
			IO('get', BASE_URL + '/timeout', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_ABORT);
					done();
				}
			}).abort();
		});
		
		it('should abort after 500ms', function (done) {
			var xhr = IO('get', BASE_URL + '/timeout', null, {
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
			IO('post', BASE_URL + '/timeout', null, {
				callback: function (err, res, xhr) {
					assert.isError(err);
					assert.strictEqual(err.type, IO.ERROR_ABORT);
					done();
				}
			}).abort();
		});
		
		it('should abort after 500ms', function (done) {
			var xhr = IO('post', BASE_URL + '/timeout', null, {
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