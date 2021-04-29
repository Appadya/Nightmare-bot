const Commands = require('../models/Command'),
	axios = require('axios');

module.exports = class Waifu extends Commands {
	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category)
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		const gen = () => ((1 + Math.floor(Math.random() * 100000)) - 1);
		let psi = (args[0]) ? args[0] : "2.0";

		if (isNaN(parseFloat(psi)))
			return channel.send(this.info(server.prefix));

		channel.send({ files: ['https://i.ibb.co/HqqsPYP/loading.gif'] }).then(async m => {
			setTimeout(() => {
				m.delete({ timeout: 50 });

				channel.send({ files: [`https://thisanimedoesnotexist.ai/results/psi-${psi}/seed${gen()}.png`] });
			}, 3500);
		});
	}
}