//IMPORTAMOS MONGOOSE

import { connect, disconnect } from 'mongoose';

//Coneccion
export async function connectDB() {
	const db = await connect('mongodb://localhost:27017/test');
	console.log('DataBase is connected to :: ', db.connection.db.databaseName);
}

//Disconnection
export async function disconnection() {
	//
	disconnect();
	console.log('Disconnection DataBase');
	
}