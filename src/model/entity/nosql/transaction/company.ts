////////////////////////////////////////////////////////
//IMPORTAMOS MODELO
import CompanyInfoModel from '../Company/CompnayInfo';
////////////////////////////////////////////////////////
// IMPORTACIONES INTERFACES
import { DataNoSql } from '../../../../interface/Company/data-sql';
////////////////////////////////////////////////////////


export const createCompanyInfo = async (id :number, values : DataNoSql ) : Promise<boolean> => {
	console.log('CREANDO INFO COMPANY...');
	try {
		//Creamos la informacion
		await executeQueryCreate(id, values);
	} catch (err) {
		console.log('ERROR al crear la Info: ',err);
		return false;
	}
	//Retornamos > Todo sale bien
	return true;
};  

//Query 
const executeQueryCreate = async ( id : number, values : DataNoSql ) => {
	
	const companyInfo = new CompanyInfoModel({
		id : id,
		mainActivity : values.mainActivity,
	});
	//Save Info
	await companyInfo.save();
	//Show Results
	console.log('CompnayInfo Results ',companyInfo);
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export const updateCompanyInfo = async (id : number, values : DataNoSql ) : Promise<boolean> => {
	console.log('Actualizando Datos...');
	try {
		//Actualizamos la informacion
		await executeQueryUpdate(id, values);
	} catch (err) {
		console.log(err);
		return false;
	}
	//ALL OK
	return true;
};
//Ejecutar query
const executeQueryUpdate = async ( id : number, values : DataNoSql ) => {
	//Actualizamos
	const companyInfo = await CompanyInfoModel.findOneAndUpdate({id}, {
		mainActivity : values.mainActivity,
	});
	//Show results
	console.log('Results update : ',companyInfo);
};