module.exports = class Command {
	constructor(name, description, argumentts, aliases, category) {
		this.name = name;
		this.description = description;
		this.argumentts = argumentts;
		this.aliases = aliases;
		this.category = category;
	}

	info(prefix) {
		if (this.argumentts.length == 0) return;

		let argument = "";
		let i, len = this.argumentts.length;
		for (i = 0; i < len; i++) {
			const a = this.argumentts[i].format();
			if (i == 0)
				argument += a
			else
				argument += ` ${a}`;
		}

		return {
			embed: {
				title: `${prefix}${this.name} ${argument}`,
				description: this.description,
				color: "#000001",
				fields: [
					{
						name: "Aliases:",
						value: (this.aliases.length > 0) ? "`"+this.aliases.join(' ')+"`" : "`None`"
					},
					{ name: "Category:", value: this.category.name }
				],
				thumbnail: {
					url: "https://i.ibb.co/pQ7PJ2M/info-icon.png"
				},
				footer: {
					text: "Nightmare - <> required, [] optional"
				}
			}
		}
	}
}