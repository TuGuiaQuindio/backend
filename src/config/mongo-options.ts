import { DataSourceOptions } from 'typeorm';
import { Guide } from '../model/entity/nosql/Guide.mongo';

//Importamos las entidades

export default { 
	type : 'mongodb',
	host : process.env.MONGO_HOST,
	port : process.env.MONGO_PORT,
	database : process.env.MONGO_DATABASE,
	synchronize : process.env.MONGODB_SYNCHRONIZE,
	logging : process.env.MONGODB_LOGGING,
	entities : [
		Guide
	]
} as DataSourceOptions;