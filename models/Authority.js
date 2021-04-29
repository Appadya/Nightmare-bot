module.exports = class Authority {
	#levels = {
		'USER': 0,
		'MODERATOR': 1,
		'ADMIN': 2,
		'DEVELOPER': 3
	}

	getLevels() {
		return this.#levels;
	}

	hasAuthority(level, commandLevel) { return level >= commandLevel }
}