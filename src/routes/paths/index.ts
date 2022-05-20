
const guide = '/guide';
const company = '/company';
const signup = '/signup';
const profile = '/profile';
const config = '/config';
const upload  = '/upload';
const photo = '/photo';
const changePass = '/changePass';

// * Todos los paths del server, las rutas
export default {
	raiz : '/',
	login : '/login',
	//SIGN-UP
	signupGuide : signup + guide,
	signupCompany : signup + company,
	home : '/home',
	//CONFING PROFILE
	guideProfileConfig : guide + profile + config,
	CompanyProfileConfig : company + profile + config,
	//UPLOAD FILE
	guideUploadPhoto : guide + profile + upload + photo,
	//RECOVER PASSWORD
	recoverPass : guide + profile + changePass,
};
