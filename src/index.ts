//////////////////////////////////////////
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
//////////////////////////////////////////
// Importamos unas configuraciones
import config from './config';
/////////////////////////////////////////
//Importar el app
import app from './app';
/////////////////////////////////////////
//IMPORTAMOS CONECCION A LA DB
import  'reflect-metadata';
import { MySQLDataSource } from './config/connection/Mysql/datasources';
/////////////////////////////////////////


const start = (port : number, name : string)  => {
	try{
		app.listen(port, ()=>{
			console.log(`
		#########################################################################
		🛡️  Server listening on port: ${port} :: nameProyect ${name} 🛡️
		#########################################################################
				`);
		});
	}catch(err){
		console.error(err);
		process.exit();
	}
};
//////////////////////////////////////////////
//Obtener datos
const port : any = config.port;
const name : string = config.name;

//Create Conexion DB
Promise.all(
	//Esperamos que se inicialice
	[ MySQLDataSource.initialize() ]
).then(()=>{
	// Starting the server 
	start(port, name);

}).catch((err) =>{
	console.log('ERROR :: Initializing -> ', err);
});