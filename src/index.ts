//////////////////////////////////////////
// Importamos unas configuraciones
import config from './config';
/////////////////////////////////////////
//Importar el app
import app from './app';
/////////////////////////////////////////

const start = (port : number, name : string) => {
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
// Starting the server 
start(port, name);
