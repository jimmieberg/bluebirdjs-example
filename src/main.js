'use strict';

const $ = require('jquery');
const Promise = require('bluebird');

const DB = {
	users: {
		'1': {
			'name': 'Mr. Foo Bar',
			'favoriteShows': [0, 1, 3]
		},
		'2': {
			'name': 'Jimmie Berg',
			'favoriteShows': [1, 999]
		},
		'3': {
		}
	},
	shows: ['The Sopranos', 'Breaking Bad', 'Better Call Saul', 'The Wire']
}

const API = {
	getUser: function(_id) {
		return new Promise((resolve, reject) => {
			if(DB.users[_id]) {
				delay(resolve.bind(this, DB.users[_id]));
			} else {
				delay(() => {
					var error = new Error();
					error.message = 'User ' + _id + ' not found';
					reject(error);
				});
			}
		});
	},
	getShow: function(_id) {
		return new Promise((resolve, reject) => {
			if(DB.shows[_id]) {
				delay(resolve.bind(this, DB.shows[_id]));
			} else {
				delay(() => {
					var error = new Error();
					error.message = 'Show ' + _id + ' not found';
					reject(error);
				});
			}
		});
	}
};

function delay(cb) {
	const ts = 500;
	setTimeout(() => {
		cb();
	}, ts);
}

const registry = function() {

	/** Private functions **/

	function getNameFromUser(user) {
		return new Promise(function(resolve, reject) {
			if(user.name) {
				resolve(user.name);
			} else {
				var error = new Error();
				error.message = 'User has no name';
				reject(error);
			}
		});
	}

	function getFavoriteShowsFromUser(user) {
		return new Promise(function(resolve, reject) {
			if(user.favoriteShows) {
				resolve(user.favoriteShows);
			} else {
				var error = new Error();
				error.message = 'User has no favorite shows';
				reject(error);
			}
		});
	}

	/** Public functions **/

	function getUser(_id) {
		return API.getUser(_id);
	}

	function getName(_id) {
		return API.getUser(_id).then(user => {
			return getNameFromUser(user);
		});
	}

	function getFavoriteShows(_id) {
		return API.getUser(_id).then(user => {
			return getFavoriteShowsFromUser(user);
		}).map(favoriteShow => {
			return API.getShow(favoriteShow);
		}).then(favoriteShows => {
			return new Promise((resolve, reject) => {
				resolve(favoriteShows);
			});
		});
	}

	return { getUser, getName, getFavoriteShows };
}();

registry.getUser(1).then(print).catch(handleError);
registry.getName(1).then(print).catch(handleError);
registry.getName(-1).then(print).catch(handleError);
registry.getFavoriteShows(1).then(print).catch(handleError);
registry.getFavoriteShows(2).then(print).catch(handleError);
registry.getFavoriteShows(3).then(print).catch(handleError);

function handleError(error) {
	print(error);
}

function print(msg) {
	document.write(JSON.stringify(msg) + '<br>');
}
