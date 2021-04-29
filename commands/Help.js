const Commands = require('../models/Command');

module.exports = class Help extends Commands {
	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category);
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		args = args.join(" ");
		let embed;
		if (!args) {
			let categories = [];
			let i, len = commands.length;
			for (i = 0; i < len; i++) {
				const c = commands[i];
				if (!categories.includes(c.category.name))
					categories.push(c.category.name);
			}

			embed = {
				title: "► Categories ◄",
				description: "See my categories below.",
				color: "000001",
				fields: [
					{
						name: "Categories:",
						value: categories.join('\n'),
					},
				]
			}
		} else {
			let commandsF = [], i, len = commands.length;
			for (i = 0; i < len; i++) {
				const c = commands[i];
				if (c.category.name.toLowerCase() === args) {
					commandsF.push(c);
				}
			}

			if (commandsF) {
				embed = {
					title: "► Commands ◄",
					description: "See my commands below.",
					color: "000001",
					fields: []
				}

				let i, len = commandsF.length;
				for (i = 0; i < len; i++) {
					const c = commandsF[i];
					embed.fields.push({
						name: `• ${server.prefix}${c.name}`,
						value: `${c.description}`
					});
				}
			} else embed = {};

		}
		try {
			channel.send({ embed: embed });
		} catch (e) { }
	}
}