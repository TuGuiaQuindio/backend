/**Se inicia el programa */
import express from 'express';
const app = express();

//////////////////////////////////////////
// Settings
// Importamos unas configuraciones
import router from './routes/login';
import config from './config';

/////////////////////////////////////////

///////////////////////////////////////////
// TODO : Configurar un paquete solo para los Middlewares
// Middlewares
const morgan = require('morgan');

app.use(morgan('dev'));


// Para que express lea los json, los pueda entender
app.use(express.json());

// ------> Routes <-------
// Utilizamos las rutas
app.use(router);

//////////////////////////////////////////////
// Starting the server 
app.listen(config.port, ()=>{
    console.log(`
#########################################################################
🛡️  Server listening on port: ${config.port} :: nameProyect ${config.name} 🛡️
#########################################################################
        `);
        
});
