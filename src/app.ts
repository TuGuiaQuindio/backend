/**Se inicia el programa */
import express from 'express';
const app = express();

//////////////////////////////////////////
// Settings
// Importamos unas configuraciones
import routerLogin from './routes/login.routes';
import routerGuideSignup from './routes/guide-signup.routes';
import routerCompanySingup from './routes/company-signup.routes';
import config from './config';

import { createConnection } from 'typeorm';
import  'reflect-metadata';
/////////////////////////////////////////

// Connexion a la db
createConnection();

///////////////////////////////////////////
// TODO : Configurar un paquete solo para los Middlewares
// Middlewares
const morgan = require('morgan');

app.use(morgan('dev'));

// Para que express lea los json, los pueda entender
app.use(express.json());

// ------> Routes <-------
// Utilizamos las rutas
app.use(routerLogin);
app.use(routerGuideSignup);
app.use(routerCompanySingup);
// app.use(routerCompanySingup);

//////////////////////////////////////////////
// Starting the server 
app.listen(config.port, ()=>{
    console.log(`
#########################################################################
🛡️  Server listening on port: ${config.port} :: nameProyect ${config.name} 🛡️
#########################################################################
        `);
        
});
