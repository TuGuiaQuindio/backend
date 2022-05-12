
const guide = '/guide';
const company = '/company';
const signup = '/signup';
const profile = '/profile';
const config = '/config';
const upload = '/upload';
const photo = '/photo';

// * Todos los paths del server, las rutas
export default {
	raiz : '/',
	login : '/login',
	signupGuide : signup + guide,
	signupCompany : signup + company,
	home : '/home',
	guideProfileConfig : guide + profile + config,
	CompanyProfileConfig : company + profile + config,
	guideUploadPhoto : guide + profile + upload + photo,
};
