//IMPORTAMOS TODAS LAS RUTAS
import { Application, Router } from 'express';
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//IMPORTAMOS RUTAS
import routerLogin from './login.routes';
import routerHome from './home.routes';
import routerRecoverPass from './recoverPass.routes';
import routerResetPass from './reset-pass.routes';
import routerVerifyTokenDecode from './verifyToken.routes';
import routerShowVacancie from './showVacancy.routes';
//COMPANY
import routerCompanySingup from './Company/company-signup.routes';
import routerCompanyProfileConfig from './Company/profile.config.routes';
import routerCompanyProfileChangePass from './Company/changePass.routes';
import routerCompanyCompleteData from './Company/completeData.routes';
import routerCompanyVacancy from './Company/vacancy.routes';
import routerCompnayShowProfilesGuides from './Company/showProfileGuide.routes';
//GUIDE
import routerGuideSignup from './Guide/guide-signup.routes';
import routerGuideProfileConfig from './Guide/profile.config.routes';
import routerGuideProfileUploadPhoto from './Guide/file.upload.routes';
import routerGuideProfileChangePass from './Guide/chagePass.routes';
import routerGuideCompleteData from './Guide/completeData.routes';
import routerGuideShowVacancies from './Guide/showVacancies.routes';
import routerGuideProfile from './Guide/profile.routes';
import routerGuideProfileVisibility from './Guide/profileVisibility.routes';
import routerGuideApplyVacancy from './Guide/apply.vacancy.routes';
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//Obtenemos las rutas y guardamos en un arreglo
const _routes : [Router][] = [
	[routerLogin],
	[routerHome],
	[routerRecoverPass],
	[routerResetPass],
	[routerVerifyTokenDecode],
	[routerShowVacancie],
	//?COMPANY
	[routerCompanySingup],
	[routerCompanyProfileConfig],
	[routerCompanyProfileChangePass],
	[routerCompanyCompleteData],
	[routerCompanyVacancy],
	[routerCompnayShowProfilesGuides],
	//?GUIDE
	[routerGuideSignup],
	[routerGuideProfileConfig],
	[routerGuideProfileUploadPhoto],
	[routerGuideProfileChangePass],
	[routerGuideCompleteData],
	[routerGuideShowVacancies],
	[routerGuideProfile],
	[routerGuideProfileVisibility],
	[routerGuideApplyVacancy],
] ;

//Pasamos por las rutas 
export const routes = ( app : Application) => {
	_routes.forEach((route) => {
		const [ url ] = route;
		app.use(url);
	});
};