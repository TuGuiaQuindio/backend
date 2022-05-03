// Entidad para crear la coleccion en mongo
//Importamos 
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Information } from './Guide-Information.mongo';

//Crear entidad -> Coleccion
@Entity()
export class Guide {

	@ObjectIdColumn()
		id: ObjectID;
	
	@Column()
		document : string;

	@Column((type) => Information)
		info : Information;

}