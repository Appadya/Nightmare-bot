const Commands = require('../models/Command'),
	Authority = require('../models/Authority'),
	Helper = require('../Helper');

module.exports = class Say extends Commands {
	#authority = new Authority();

	constructor(name, description, argumentts, aliases, category) {
		super(name, description, argumentts, aliases, category)
	}

	execute(Discord, bot, server, author, member, message, guild, channel, args, commands) {
		args = args.join(' ');

		if (args) {
			if (this.#authority.hasAuthority(Helper.getAuthority(member), this.category.auth))
				message.delete({ timeout: 50 });
			channel.send(args);
		} else message.reply("you need to type something.").then(e => e.delete({ timeout: 5000 }));
	}
}