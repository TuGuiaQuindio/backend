import { DataSource } from 'typeorm';
import mysqlOptions from './mysql-options';

//Crear Conección MySQL
const MySQLDataSource = new DataSource(mysqlOptions);
//Exportamos
export { MySQLDataSource }; 