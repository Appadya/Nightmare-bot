const alive = require('./uptime'),
	Firebase = require('./managers/Firebase'),
	Commands = require('./managers/Commands'),
	Authority = require('./models/Authority'),
	Helper = require('./Helper'),
	Discord = require('discord.js'),
	bot = new Discord.Client();

alive();

var servers,
	commandsManager = new Commands(),
	authority = new Authority();

bot.on('ready', async () => {
	console.log('[B] Nightmare ON');

	let guildsIds = await bot.guilds.cache.map(guild => guild.id);
	Firebase.observer(guildsIds, (result) => servers = result);
});

bot.on('message', message => {
	var server;
	try {
		server = servers[message.guild.id];
	} catch (e) { return; }

	if(!server.prefix) return;

	const prefix = server.prefix,
		author = message.author,
		member = message.member,
		guild = message.guild,
		channel = message.channel;

	let cmdArgs = message.content.split(" "),
		cmd = cmdArgs[0].replace(server.prefix, ""),
		args = cmdArgs.slice(1);

	if (author.bot || !message.content.startsWith(server.prefix)) return;

	let commands = commandsManager.getCommands(),
		command = null;

	let i, len = commands.length;
	for(i = 0; i < len; i++) {
		const c = commands[i];
		if(c.name === cmd) {
			command = c;
		} else if (c.aliases.includes(cmd)) {
			command = c;
		}
	}

	if (command) {
		if (authority.hasAuthority(Helper.getAuthority(member), command.category.auth)) {
			command.execute(Discord, bot, server, author, member, message, guild, channel, args, commandsManager.getCommands());
		} else
			message.reply("you are not allowed to use this command.").then(e => e.delete({ timeout: 5000 }));
	}
});

bot.login(process.env.TOKEN);