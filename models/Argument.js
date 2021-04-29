module.exports = class Argument {
	constructor(type, necessary = false) {
		this.type = type;
		this.necessary = necessary;
	}

	format() {
		return (this.necessary) ? `<${this.type}>` : `[${this.type}]`;
	}
}