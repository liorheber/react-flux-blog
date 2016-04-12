'use strict';

import http from 'http';
import path from 'path';
import express from 'express';
import graphqlHttp from 'express-graphql';

import { widgetsSchema } from './graphql/schema';

export default function(options) {

	const app = express();
	const server = http.createServer(app);

	app.use('/graphql', graphqlHttp({ schema: widgetsSchema, pretty: true, graphiql: true }));
	app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
	app.use(express.static(options.folder));

	return {
		start: function() {

			return new Promise((resolve, reject) => {
				server.listen(options.port, (err) => {

					if (err) {
						reject(err);
						return;
					}

					resolve();

				});
			});

		},
		stop: function() {

			return new Promise((resolve, reject) => {
				server.close((err) => {

					if (err) {
						reject(err);
						return;
					}

					resolve();

				});
			});

		}
	};
}
