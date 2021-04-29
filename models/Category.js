const Authority = require("./Authority");

module.exports = class Category {
	#auth = new Authority();
	#levels = this.#auth.getLevels();

	#categories = {
		"MISC": {
			"name": "Varied",
			"description": "Commands that do not fit into any category.",
			"auth": this.#levels.USER
		},
		"INFO": {
			"name": "Information",
			"description": "Information commands, about the bot and general information.",
			"auth": this.#levels.USER
		},
		"PIXEL": {
			"name": "Pixelgames",
			"description": "Pixel games commands.",
			"auth": this.#levels.USER
		},
		"MOD": {
			"name": "Moderation",
			"description": "Commands for moderation.",
			"auth": this.#levels.MODERATOR
		}
	}

	getCategories() {
		return this.#categories;
	}
}