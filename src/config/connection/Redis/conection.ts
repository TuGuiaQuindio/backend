
import { createClient, RedisClientOptions } from 'redis';
//Opciones de la DB
const options = {
	port : process.env.REDIS_PORT,
	host : process.env.REDIS_HOST,
	password : process.env.REDIS_PASSWORD,
} as RedisClientOptions;

// Se crea el cliente
const redisClient = createClient(options);
//Creamos el cliente con la coneccion
redisClient.on('connect', () => {
	console.log('Connected');
});
//Se connecta
redisClient.connect()
	.then(res => {
		console.log('Client Connect done: ', res);
	}).catch(err => {	
		console.log('Error during REDIS client connection: ', err);
	});
//Exportamos
export { redisClient }; 