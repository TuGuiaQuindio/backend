// import token from './token-services';

import mockData from '../mock/data';

import { createToken }  from '../services/token.service'

// const { createToken } = service;

export default {

    login:(email:string, password:string) =>{
        return new Promise((res, rej) => {
            // Obtenemos los datos
            const userEmail = mockData.guide.email;
            const userPass = mockData.guide.password;

            if (email == userEmail && password == userPass) {

                const token = createToken(email, password);
                // 
                res(token);

            }else{
                rej("Datos no validos");
            }
        });
    },
}