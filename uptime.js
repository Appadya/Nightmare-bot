const express = require('express'),
	server = express();

server.all('/', (req, res) => {
	const now = new Date();

	res.send('OK');
	console.log(`Ping ${now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
});

module.exports = function ping() {
	server.listen(3000, () => {
		const now = new Date();
		console.log(`Ready ${now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
	});
}