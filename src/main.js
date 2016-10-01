'use strict';

var Promise = require('bluebird');

new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('Hello world!');
	},1000);
}).then(function(message) {
	document.write(message);
});