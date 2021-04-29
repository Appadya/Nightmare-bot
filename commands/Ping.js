const Commands = require('../models/Command');

module.exports = class Ping extends Commands {
	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category)
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		channel.send({
			embed: {
				"color": "#000001",
				"fields": [
					{
						"name": "⌛ **Client**",
						"value": ">> " + (new Date().getTime() - message.createdTimestamp),
						"inline": true
					},
					{
						"name": "⏱️ **API**",
						"value": ">> " + Math.floor(bot.ws.ping),
						"inline": true
					},
				]
			}
		});
	}
}