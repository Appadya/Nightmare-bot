const Commands = require('../models/Command'),
	axios = require('axios');

module.exports = class Inspire extends Commands {
	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category)
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		channel.send({ files: ['https://i.ibb.co/HqqsPYP/loading.gif'] }).then(async m => {
			let { data, status } = await axios.get('https://inspirobot.me/api?generate=true');

			if (status != 200)
				return message.reply("request blocked...")
					.then(m => m.delete({ timeout: 5000 }));

			setTimeout(() => {
				m.delete({ timeout: 50 });

				channel.send({ files: [data] });
			}, 3500);
		});
	}
}