import { DataSource } from 'typeorm';
import mysqlOptions from './mysql-options';
import MongodbOptions from './mongo-options';

//Crear Conección MySQL
const MySQLDataSource = new DataSource(mysqlOptions);
//Crear Conección MongoDB
const MongoDatasource = new DataSource(MongodbOptions);
//Exportamos
export { MySQLDataSource, MongoDatasource }; 