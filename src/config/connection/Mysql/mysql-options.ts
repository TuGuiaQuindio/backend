import { DataSourceOptions } from 'typeorm';

//Importamos las entidades 
import { getSqlEntities } from './getEntities';

export default {
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	logging : process.env.LOGGING === 'true',
	synchronize: process.env.DB_SYNCHRONIZE === 'true',
	entities: getSqlEntities().split(',')
} as DataSourceOptions;
