/**Se inicia el programa */
import express, { Application } from 'express';
const app :  Application = express();
///////////////////////////////////////////
//IMPORTACIONES RUTAS
import routerLogin from './routes/login.routes';
//Company
import routerCompanySingup from './routes/Company/company-signup.routes';
import routerCompanyProfileConfig from './routes/Company/profile.config.routes';
import routerCompanyProfileChangePass from './routes/Company/changePass.routes';
//Guide
import routerGuideSignup from './routes/Guide/guide-signup.routes';
import routerGuideProfileConfig from './routes/Guide/profile.config.routes';
import routerGuideProfileUploadPhoto from './routes/Guide/file.upload.routes';
import routerGuideProfileChangePass from './routes/Guide/chagePass.routes';
//
import routerHome from './routes/home.routes';
import routerRecoverPass from './routes/recoverPass.routes';
//////////////////////////////////////////
//MORGAN
import morgan from 'morgan';
//HELMET
import helmet from 'helmet'; 
//CORS
import cors from 'cors';
//////////////////////////////////////////
//IMPORTAMOS CONECCION A LA DB
import { connectDB } from './model/entity/nosql/conection/conection-mongodg';
/////////////////////////////////////////
// Connexion a la db
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
app.use(routerLogin);
app.use(routerHome);
app.use(routerRecoverPass);
// ---> Company <---
app.use(routerCompanySingup);
app.use(routerCompanyProfileConfig);
app.use(routerCompanyProfileChangePass);
// ---> Guide <---
app.use(routerGuideSignup);
app.use(routerGuideProfileConfig);
app.use(routerGuideProfileUploadPhoto);
app.use(routerGuideProfileChangePass);
///////////////////////////////////////////////
///////////////////////////////////////////////
//Exporting app
export default app;
