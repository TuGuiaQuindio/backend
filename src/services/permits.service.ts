//SERVICIO DE PERMISOS

export const getAccess = (accessPermit:[]): string|null => {
	//TIPO temporal
	type AccessType = { access:string };
	//Bandera
	let access = null;
	for(const obj of accessPermit){
		access = obj as AccessType;	
	}
	if (!access) return null;
	//Retornamos permisos
	return access?.access;
};