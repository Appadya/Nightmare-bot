const firebase = require("firebase-admin");

firebase.initializeApp({
	credential: firebase.credential.cert({
		"type": "service_account",
		"project_id": process.env.PROJECT_ID,
		"private_key_id": process.env.PRIVATE_KEY_ID,
		"private_key": process.env.PRIVATE_KEY,
		"client_email": process.env.CLIENT_EMAIL,
		"client_id": process.env.CLIENT_ID,
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
	}),
	databaseURL: process.env.DATABASE_URL
})

module.exports = class FireBase {
	static #db = firebase.firestore();
	static #servers = this.#db.collection("servers");

	static createServer(server_id) {
		return new Promise(async resolve => {
			try {
				await this.#servers.doc(server_id)
					.set({
						prefix: 'n!',
					}).then(() => {
						resolve(true);
					});
			} catch (e) { resolve(false); }
		})
	}

	// static createPhrase(server_id, authorname, sendername, content, dateString) {
	// 	return new Promise(async resolve => {
	// 		try {
	// 			await servers.doc(server_id)
	// 				.collection('phrases').doc(dateString.replace(/[^A-Z0-9]/ig, ''))
	// 				.set({
	// 					author: authorname,
	// 					sender: sendername,
	// 					content: content,
	// 					created: dateString
	// 				}).then(() => {
	// 					resolve(true);
	// 				})
	// 		} catch (e) { resolve(false); }
	// 	});
	// }

	/*static getAllServers(guilds_ids) {
		return new Promise(async resolve => {
			try {
				let snap = await this.#servers.get(),
					result = await snap.docs.reduce((r, o) => {
						let data = o.data();
						r[o.id] = data;
						return r;
					}, {});

				for (const id of guilds_ids) {
					if (result[id] == undefined)
						if (await this.createServer(id))
							console.log(`${id} added on database.`);
				}

				if (Object.keys(result).length > 0) resolve(result);
				resolve(null);
			} catch (e) {
				throw e;
				resolve(null);
			}
		});
	}*/

	static #listen(collection) {
		return new Promise(resolve => {
			collection.onSnapshot((snap) => {
				resolve(snap);
			})
		});
	}

	static async observer(guildIds, callback) {
		try {
			let servers_snap = await this.#listen(this.#servers),
			r_snap_servers = await servers_snap.docs.reduce((servers, so) => {
				servers[so.id] = so.data();
				return servers;
			}, {});

			if (guildIds)
				for (const id of guildIds) {
					if (r_snap_servers[id] == undefined)
						if (await this.createServer(id))
							console.log(`${id} added on database.`);
				}

			if (Object.keys(r_snap_servers).length > 0) return callback(r_snap_servers);
			return callback(null);
		} catch (e) { return callback(null); }
	}


}	