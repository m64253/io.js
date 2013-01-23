(function (root) {
	"use strict";
	
	var win = root.window,
		localhost = win.location.protocol + '//' + win.location.host,
		
		isCrossDomain = function (url) {
			return url.indexOf('http') === 0 && url.indexOf(localhost) !== 0;
		},
		
		setHeaders = function (xhr, headers) {
			if (xhr.setRequestHeader) {
				headers = headers || {};
				for (var key in headers) {
					if (headers.hasOwnProperty(key)) {
						xhr.setRequestHeader(key, headers[key]);
					}
				}
			}
		},
		
		
		sendData = function (xhr, data) {
			data = data || {};
			
			if (typeof data === 'string') {
				xhr.send(data);
				
			} else {
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						xhr.send(key + '=' + encodeURIComponent(data[key]));
					}
				}
			}
		},
		
		createError = function (type, message) {
			var err = new Error(message);
			err.type = type;
			return err;
		},
		
		IO = root.IO = function IO(method, url, data, options) {
			
			if (typeof options === 'function') {
				options = {
					callback: options
				};
			} else {
				options = options || {};
			}
			options.headers = options.headers || {};
			options.timeout = options.timeout || 5000;
			
			
			var xhr = new win.XMLHttpRequest(),
				callback = options.callback,
				xhrAbort,
				timer;
			
			options.callback = function (err, res, xhr) {
				clearTimeout(timer);
				
				xhr.onreadystatechange = null;
				xhr.onload = null;
				xhr.onerror = null;
				
				if (callback) {
					var localCallback = callback;
					callback = null;
					localCallback(err, res, xhr);
				}
			};
			
			xhr.onreadystatechange = function () {
				try {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							options.callback(null, xhr.responseText, xhr);
						} else {
							options.callback(
								createError(IO.ERROR_NETWORK, 'IO Failed due an network error, with status ' + xhr.status),
								null,
								xhr
							);
						}
					}
				} catch(err) {
					options.callback(createError(IO.ERROR_NETWORK, 'IO Failed due an network error. ' + err.message), null, xhr);
				}
			};
			
			if (isCrossDomain(url)) {
				if (typeof xhr.withCredentials !== 'undefined') {
					options.contentType = 'text/plain';
					//xhr.withCredentials = false;
					
				} else if (typeof win.XDomainRequest !== 'undefined') {
					xhr = new win.XDomainRequest();
					
					xhr.onload = function () {
						options.callback(null, xhr.responseText, xhr);
					};
					
					xhr.onerror = function () {
						options.callback(
							createError(IO.ERROR_NETWORK, 'IO Failed due an network error'),
							null,
							xhr
						);
					};
					
				} else {
					options.callback(
						createError(IO.ERROR_CROSS_DOMAIN, 'Cross domain requests are not supported'), 
						null, 
						xhr
					);
					
					return xhr;
				}
			} else {
				options.headers['X-Requested-With'] = options.headers['X-Requested-With'] || 'XMLHttpRequest';
			}
			
			// Timeout
			timer = setTimeout(function () {
				options.callback(
					createError(IO.ERROR_TIMEOUT, 'IO Failed due to timeout'),
					null,
					xhr
				);
				xhrAbort.call(xhr);
			}, options.timeout);
			
			
			// Open connection
			xhr.open(method, url);
			
			
			// Headers
			options.headers['Content-Type'] = options.contentType || 'text/plain';
			setHeaders(xhr, options.headers);
			
			
			// Data
			if (data) {
				sendData(xhr, data);
			} else {
				xhr.send();
			}
			
			// Patch
			xhrAbort = xhr.abort;
			xhr.abort = function () {
				options.callback(
					createError(IO.ERROR_ABORT, 'IO was aborted'),
					null,
					xhr
				);
				xhrAbort.call(xhr);
			};
			return xhr;
		};
	
	
	/**
	 * Error reference types 
	 */
	IO.ERROR_NETWORK = 1;
	IO.ERROR_ABORT = 2;
	IO.ERROR_TIMEOUT = 3;
	IO.ERROR_CROSS_DOMAIN = 4;
	
	
}(this));