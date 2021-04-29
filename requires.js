const COMMANDS_PATH = "./commands/";

const Help = require(COMMANDS_PATH.concat('Help')),
	Avatar = require(COMMANDS_PATH.concat('Avatar')),
	Ping = require(COMMANDS_PATH.concat('Ping')),
	Inspire = require(COMMANDS_PATH.concat('Inspire')),
	Prune = require(COMMANDS_PATH.concat('Prune')),
	Waifu = require(COMMANDS_PATH.concat('Waifu')),
	Say = require(COMMANDS_PATH.concat('Say'));

module.exports = {
	Help,
	Avatar,
	Ping,
	Inspire,
	Prune,
	Waifu,
	Say
}