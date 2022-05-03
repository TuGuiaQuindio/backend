import { DataSourceOptions } from 'typeorm';

//Importamos las entidades
import { getNoSqlEntities } from './getEntities';

export default { 
	type : 'mongodb',
	host : process.env.MONGO_HOST,
	port : process.env.MONGO_PORT,
	database : process.env.MONGO_DATABASE,
	synchronize : process.env.MONGODB_SYNCHRONIZE,
	logging : process.env.MONGODB_LOGGING,
	entities : getNoSqlEntities().split(',')
} as DataSourceOptions;