const Commands = require('../models/Command');

module.exports = class Avatar extends Commands {
	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category)
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		args = args.join("").replace(/[^\w\s]/gi, '');

		let user = bot.users.cache.get(args) || message.mentions.users.first();
		if(!user)
			return channel.send(this.info(server.prefix));
		
		message.channel.send({
			embed: {
				"title": "Aqui está: ",
				"color": "#000001",
				"image": {
					"url": user.avatarURL({ format: 'png', dynamic: true, size: 1024 }),
				}
			}
		});
	}
}