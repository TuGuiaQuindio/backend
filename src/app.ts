/**Se inicia el programa */
import express, { Application } from 'express';
const app :  Application = express();
///////////////////////////////////////////
//IMPORTACIONES RUTAS
import routerLogin from './routes/login.routes';
import routerGuideSignup from './routes/guide-signup.routes';
import routerCompanySingup from './routes/company-signup.routes';
import routerHome from './routes/home.routes';
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

///////////////////////////////////////////////
//Exporting app
export default app;
