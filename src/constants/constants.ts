import { AccessPermit } from '../interface/access';

// Se define los valores para cada rol, los tipos
export enum Roles  {
	GUIDE = 1,
	COMPANY = 2
}

const list:AccessPermit[] = [
	{name:'FREE', NumberVacancies: 3},
	{name:'PREMIUM', NumberVacancies:7}
];

export const getNumberAccess = (accessPermit:string):AccessPermit | undefined => {
	return list.find(ele => ele.name == accessPermit);
};