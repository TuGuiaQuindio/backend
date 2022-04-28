/**Se inicia el programa */
import express, { Application } from 'express';
const app :  Application = express();
///////////////////////////////////////////
//IMPORTACIONES RUTAS
import routerLogin from './routes/login.routes';
//Company
import routerCompanySingup from './routes/Company/company-signup.routes';
//Guide
import routerGuideSignup from './routes/Guide/guide-signup.routes';
import routerGuideProfileConfig from './routes/Guide/profile.config.routes';
//
import routerHome from './routes/home.routes';
//////////////////////////////////////////
//MORGAN
import morgan from 'morgan';
//HELMET
import helmet from 'helmet'; 
//////////////////////////////////////////
//IMPORTAMOS CONECCION A LA DB
// import { createConnection } from 'typeorm';
// import  'reflect-metadata';
/////////////////////////////////////////

// Connexion a la db
// createConnection();

///////////////////////////////////////////
// Middlewares
app.use(morgan('dev'));
app.use(helmet());
// Para que express lea los json, los pueda entender
app.use(express.json());

// ------> Routes <-------
// Utilizamos las rutas
app.use(routerLogin);
app.use(routerGuideSignup);
app.use(routerCompanySingup);
app.use(routerHome);
app.use(routerGuideProfileConfig);
///////////////////////////////////////////////
//Exporting app
export default app;
