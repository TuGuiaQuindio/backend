////////////////////////////////////////////////////////
//IMPORTAMOS MODELO
import CompanyInfoModel from '../Company/CompanyInfo';
////////////////////////////////////////////////////////
// IMPORTACIONES INTERFACES
import { DataNoSql } from '../../../../interface/Company/data';
////////////////////////////////////////////////////////

export const createCompanyInfo = async (id :number, values : DataNoSql, completeData ?: boolean ) : Promise<boolean> => {
	console.log('CREANDO INFO COMPANY...');
	try {
		//Creamos la informacion
		await executeQueryCreate(id, values, completeData);
	} catch (err) {
		console.log('ERROR al crear la Info: ',err);
		return false;
	}
	//Retornamos > Todo sale bien
	return true;
};  

//Query 
const executeQueryCreate = async ( id : number, values : DataNoSql, completeData ?: boolean ) => {
	
	const companyInfo = new CompanyInfoModel({
		id : id,
		mainActivity : values.mainActivity,
		completeData : completeData
	});
	//Save Info
	await companyInfo.save();
	//Show Results
	console.log('CompnayInfo Results ',companyInfo);
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export const updateCompanyInfo = async (id : number, values : DataNoSql, completeData ?: boolean ) : Promise<boolean> => {
	console.log('Actualizando Datos...');
	try {
		//Actualizamos la informacion
		await executeQueryUpdate(id, values, completeData);
	} catch (err) {
		console.log(err);
		return false;
	}
	//ALL OK
	return true;
};
//Ejecutar query
const executeQueryUpdate = async ( id : number, values : DataNoSql, completeData ?: boolean ) => {
	//Actualizamos
	const companyInfo = await CompanyInfoModel.findOneAndUpdate({id}, {
		mainActivity : values.mainActivity,
		completeData,
	});
	//Show results
	console.log('Results update : ',companyInfo);
};
//***VACANCIES
//Agregar el id de la vacante
export const addVacancies = async (id:number, idVacancies:object): Promise<boolean> => {
	//
	console.log('Object-> ',idVacancies);
	try {
		await CompanyInfoModel.updateOne({id},
			{$addToSet:{'vacancies':idVacancies}}
		);
	} catch (error) {
		console.log('ERROR en agregar vacante: ',error);
		return false;
	}
	//ALL OK
	return true;
};
//?Update vacancies
export const updateVacancies = async (id:number,vacancies:object[]) => {
	//
	try {
		const result = await CompanyInfoModel.updateOne({id},{
			vacancies
		});
		console.log('** ',result);
	} catch (error) {
		console.log('ERROR en actualizar las vacantes: ',error);
		return false;
	}
	return true;
};

//Obtenemos toda la informacion
export const allInfo = async () => {
	try {		
		const result = await CompanyInfoModel.find();
		return result;
	} catch (error) {
		console.error('ERROR: al obtener la info: ',error);
		return false;
	}
};

export const getInfoOne = async (id:number) => {
	try {
		const result = await CompanyInfoModel.findOne({idCompany:id});
		return result;
	} catch (error) {
		console.error('ERROR: obtenido info comapny: ', error);
		return false;
	}
};