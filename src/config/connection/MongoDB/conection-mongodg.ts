//IMPORTAMOS MONGOOSE
import { connect, disconnect } from 'mongoose';

const noSql_db = process.env.MONGO_DATABASE;
const port = process.env.MONGO_PORT;
const host = process.env.MONGO_HOST;
const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;
// const URL = `mongodb://${username}:${password}@${host}:${port}`;
// const URL = 'mongodb://mongo:gKFt6KbaP0QjEzHzyfJ3@containers-us-west-74.railway.app:8039';
console.log(`mongodb://${username}:${password}@${host}:${port}/${noSql_db}`);
//Coneccion
export async function connectDB() {
	console.log('CONECTANDO MONGO...');
	const db = await connect('mongodb://'+host+':'+port+'/'+noSql_db);
	// const db = await connect(URL);
	// const db = await connect(host+':'+port+'/'+noSql_db);
	console.log('Mongo:DataBase is connected to :: ', db.connection.db.databaseName);
}
//Disconnection
export async function disconnection() {
	//
	disconnect();
	console.log('Disconnection DataBase');
	
}