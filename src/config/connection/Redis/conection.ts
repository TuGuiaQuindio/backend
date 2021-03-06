
import { createClient, RedisClientOptions } from 'redis';
//Opciones de la DB
const options = {
	//Railway	
	// url:`redis://${{ process.env.REDISUSER }}:${{ process.env.REDISPASSWORD }}@${{ process.env.REDISHOST }}:${{ process.env.REDISPORT }}`,
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
	password: process.env.REDIS_PASSWORD,
} as RedisClientOptions;

console.warn('Opciones de redis: ', options);

// Se crea el cliente
const redisClient = createClient(options);
//Creamos el cliente con la coneccion
redisClient.on('connect', () => {
	console.log('REDIS Connected');
});
//Se connecta
redisClient.connect()
	.then((res) => {
		console.log('Redis: Client Connect done: ', res);
	}).catch(err => {
		console.log('Error during REDIS client connection: ', err);
	});
//Exportamos
export { redisClient }; 
