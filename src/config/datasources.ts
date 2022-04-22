import { DataSource } from 'typeorm';
import mysqlOptions from './mysql-options';

const MySQLDataSource = new DataSource(mysqlOptions);
export { MySQLDataSource };