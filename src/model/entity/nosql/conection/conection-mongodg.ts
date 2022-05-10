//IMPORTAMOS MONGOOSE

import { connect, disconnect } from 'mongoose';

const noSql_db = process.env.MONGO_DATABASE?.toString();
const port = process.env.MONGO_PORT?.toString();
const host = process.env.MONGO_HOST?.toString();
//Coneccion
export async function connectDB() {
	const db = await connect('mongodb://'+host+':'+port+'/'+noSql_db);
	console.log('DataBase is connected to :: ', db.connection.db.databaseName);
}

//Disconnection
export async function disconnection() {
	//
	disconnect();
	console.log('Disconnection DataBase');
	
}