//Obtenemos las entidades condicionando si
export const getSqlEntities = (): string => {
	const isTesting = process.env.NODE_ENV && process.env.NODE_ENV === 'test';
	const entities: { js: string, ts: string } = {
		ts: process.env.TS_ENTITIES as string,
		js: process.env.JS_ENTITIES as string,
	};
	// console.log('->',process.env);
	
	const entitiesPath = isTesting ? entities.ts : entities.js;

	if(!entitiesPath) console.warn('WARN: No entities path had been loaded.');
	return entitiesPath ?? '';
};

export const getNoSqlEntities = (): string => {
	const isTesting = process.env.NODE_ENV && process.env.NODE_ENV === 'test';
	const entities: { js: string, ts: string } = {
		ts: process.env.TS_NOSQLENTITIES as string,
		js: process.env.JS_NOSQLENTITIES as string,
	};
	// console.log('->',process.env);
	
	const entitiesPath = isTesting ? entities.ts : entities.js;

	if(!entitiesPath) console.warn('WARN: No entities path had been loaded.');
	return entitiesPath ?? '';
};