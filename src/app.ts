/**Se inicia el programa */
import express from 'express';
const app = express();
///////////////////////////////////////////
//IMPORTACIONES RUTAS
import routerLogin from './routes/login.routes';
import routerGuideSignup from './routes/guide-signup.routes';
import routerCompanySingup from './routes/company-signup.routes';
import routerHome from './routes/home.routes';
//////////////////////////////////////////
// Importamos unas configuraciones
import config from './config';
//////////////////////////////////////////
//MORGAN
import morgan from 'morgan';
//////////////////////////////////////////
//IMPORTAMOS CONECCION A LA DB
import { createConnection } from 'typeorm';
import  'reflect-metadata';
/////////////////////////////////////////

// Connexion a la db
createConnection();

///////////////////////////////////////////
// Middlewares
app.use(morgan('dev'));

// Para que express lea los json, los pueda entender
app.use(express.json());

// ------> Routes <-------
// Utilizamos las rutas
app.use(routerLogin);
app.use(routerGuideSignup);
app.use(routerCompanySingup);
app.use(routerHome);

//////////////////////////////////////////////
// Starting the server 
app.listen(config.port, ()=>{
	console.log(`
#########################################################################
🛡️  Server listening on port: ${config.port} :: nameProyect ${config.name} 🛡️
#########################################################################
		`);
		
});
