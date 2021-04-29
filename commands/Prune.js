const Commands = require('../models/Command');

module.exports = class Prune extends Commands {
	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category)
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		let quantity = parseInt(args[0]),
			userid = (args[1]) ? args[1].replace(/[^\w\s]/gi, '') : " ";

		if (isNaN(quantity))
			return channel.send(this.info(server.prefix));

		channel.messages.fetch({ limit: 100 })
			.then(msgs => {
				if (!isNaN(parseInt(userid)))
					msgs = msgs.filter(m => m.author.id == userid);

				if (!isNaN(parseInt(userid)) || userid) {
					msgs = msgs.array().slice(0, quantity + 1);
					channel.bulkDelete(msgs).then(() => {
						message.reply(`**${quantity}** messages have been purged.`)
							.then(msg => msg.delete({ timeout: 5000 }))
					})
				}

			})
	}
}