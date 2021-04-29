const Category = require('../models/Category'),
	Argument = require('../models/Argument'),
	{
		Help,
		Avatar,
		Ping,
		Inspire,
		Prune,
		Waifu
	} = require('../requires');

module.exports = class Commands {
	#category = new Category();
	#categories = this.#category.getCategories();

	#commands = [
		new Help("help", "Help command", [
			new Argument("command"),
		], ["ajuda"], this.#categories.INFO),
		new Avatar("avatar", "Shows your avatar or the pinged user.", [
			new Argument("mention/userid"),
		], ["ft", "pfp"], this.#categories.MISC),
		new Ping("ping", "Returns your ms and API ms.", [], ["pong"], this.#categories.MISC),
		new Inspire("inspire", "Let me inspire you.", [], ["inspireme"], this.#categories.MISC),
		new Prune("prune", "Prune messages", [
			new Argument("quantity", true),
			new Argument("mention/userid")
		], [], this.#categories.MOD),
		new Waifu("generatewaifu", "Generates a waifu for you.", [
			new Argument("0.5<=>2.0")
		], ["genwaifu", "mywaifu", "waifu"], this.#categories.MISC)
	]

	getCommands() {
		return this.#commands;
	}
}