function assert(value, expected, tester) {
	if (!tester(value, expected)) {
		throw new Error(value + ' did not fulfill test against ' + expected);
	}
}

assert.isError = function (value) {
	assert(value, null, function (a) {
		return a instanceof Error;
	});
};

assert.equal = function (value, expected) {
	assert(value, expected, function (a, b) {
		return a == b;
	});
};

assert.strictEqual = function (value, expected) {
	assert(value, expected, function (a, b) {
		return a === b;
	});
};


assert.objectEqual = function (value, expected) {
	assert(value, expected, function (a, b) {
		for (var k in a) {
			if (a.hasOwnProperty(k) && a[k] != b[k]) {
				return false;
			}
		}
		return true;
	});
};

assert.objectStrictEqual = function (value, expected) {
	assert(value, expected, function (a, b) {
		for (var k in a) {
			if (a.hasOwnProperty(k) && a[k] !== b[k]) {
				return false;
			}
		}
		return true;
	});
};