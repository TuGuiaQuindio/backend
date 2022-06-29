
const guide = '/guide';
const company = '/company';
const signup = '/signup';
const profile = '/profile';
const profiles = '/profiles';
const config = '/config';
const upload  = '/upload';
const photo = '/photo';
const changePass = '/changePass';
const completeData = '/completeData';
const verifyToken = '/verifyToken';
const vacancyObjectIdOptional = /^\/company\/vacancy\/([a-fA-F0-9]{24})?$/;
const showVacancies = '/vacancies';
const visibility = '/visibility';
const applyVacancy = '/applyVacancy';

// * Todos los paths del server, las rutas
export default {
	raiz : '/',
	login : '/login',
	recover : '/recoverPass',
	resetPass : '/reset-pass',
	verifyToken : verifyToken,
	//SIGN-UP
	signupGuide : signup + guide,
	signupCompany : signup + company,
	home : '/home',
	//Guinde Profile
	guideProfile : guide + profile,
	//CONFING PROFILE
	guideProfileConfig : guide + profile + config,
	CompanyProfileConfig : company + profile + config,
	//UPLOAD FILE
	guideUploadPhoto : guide + profile + upload + photo,
	//RECOVER PASSWORD
	changePassGuide : guide + profile + changePass,
	changePassCompany : company + profile + changePass,
	//COMPLETE DATA
	completeDataGuide : guide + completeData,
	completeDataCompany : company + completeData,
	// crear vacantes Empresa
	vacancy : vacancyObjectIdOptional,
	//Mostrar las vacantes
	showVacancies: guide + showVacancies,
	//Show profile guides
	showProfileGuides: company + profiles,
	//Visibility
	profileVisibility : guide + profile + visibility,
	//aplicar a vacante
	applyVacancy : guide + applyVacancy,
	
};
