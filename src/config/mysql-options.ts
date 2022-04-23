import { DataSourceOptions } from 'typeorm';

const getEntities = (): string => {
	const isTesting = process.env.NODE_ENV && process.env.NODE_ENV === 'test';
	const entities: { js: string, ts: string } = {
		ts: process.env.TS_ENTITIES as string,
		js: process.env.JS_ENTITIES as string,
	};
	// console.log('->',process.env);
	
	return isTesting ? entities.ts : entities.js;
};

export default {
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	logging : process.env.LOGGING === 'true',
	synchronize: process.env.DB_SYNCHRONIZE === 'true',
	entities: getEntities().split(',')
} as DataSourceOptions;
