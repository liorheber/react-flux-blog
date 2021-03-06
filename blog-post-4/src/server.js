'use strict';

import http from 'http';
import path from 'path';
import express from 'express';

export default function(options) {

	const app = express();
	const server = http.createServer(app);

	app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
	app.use(express.static(options.folder));

	return {
		start: () => new Promise((resolve, reject) =>
			server.listen(options.port, err =>
				err ? reject(err) : resolve())),
		stop: () => new Promise((resolve, reject) =>
			server.close(err =>
				err ? reject(err) : resolve()))
	};
}
