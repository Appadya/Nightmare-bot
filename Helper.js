const Authority = require('./models/Authority'),
	Firebase = require('./managers/Firebase');

module.exports = class Helper {
	static #authority = new Authority();
	static #levels = this.#authority.getLevels();

	static getAuthority(member) {
		if (member.id == 332258268971925505 || 612405588252426282) {
			return this.#levels.DEVELOPER;
		} else if (member.hasPermission('BAN_MEMBERS', false, false) && member.hasPermission('KICK_MEMBERS', false, false)) {
			return this.#levels.ADMIN;
		} else if (member.hasPermission('MANAGE_MESSAGES', false, false)) {
			return this.#levels.MODERATOR;
		} else { return this.#levels.USER }
	}
}