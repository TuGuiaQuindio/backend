
const guide = '/guide';
const company = '/company';
const signup = '/signup';

// * Todos los paths del server, las rutas
export default {
	raiz:'/',
	login: '/login',
	signupGuide:signup+guide,
	signupCompany:signup+company,
	home: '/home',
	configProfilePut : guide+'/profile/config/:id',
};

// export const login = '/login'
