/**Se inicia el programa */
import express, { Application } from 'express';
const app :  Application = express();
///////////////////////////////////////////
//IMPORTACIONES RUTAS
import { routes } from './routes/index.routes';
//////////////////////////////////////////
//MORGAN
import morgan from 'morgan';
//HELMET
import helmet from 'helmet'; 
//CORS
import cors from 'cors';
//////////////////////////////////////////
//IMPORTAMOS CONECCION A LA DB
import { connectDB } from './config/connection/MongoDB/conection-mongodg';
/////////////////////////////////////////
// Connexion a la db
//Mongo
connectDB();
///////////////////////////////////////////
//OPCIONES DE LOS CORS
const originOptions : cors.CorsOptions = {
	origin : new RegExp(process.env.CORS_ORIGIN as string ?? 'http://localhost:3000')
};
// Middlewares
app.use(cors(originOptions));
app.use(morgan('dev'));
app.use(helmet());
// Para que express lea los json, los pueda entender
app.use(express.json());

// ------> Routes <-------
// Utilizamos las rutas
routes(app);
///////////////////////////////////////////////
///////////////////////////////////////////////
//Exporting app
export default app;
