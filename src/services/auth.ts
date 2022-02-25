
import mockData from '../mock/data';

export default {

    login:(email:string, password:string) =>{
        return new Promise((res, rej) => {
            // Obtenemos los datos
            const userEmail = mockData.guide.email;
            const userPass = mockData.guide.password;

            if (email == userEmail && password == userPass) {
                res("aldkAdkmfromvr5");
            }else{
                rej("Datos no validos");
            }
        });
    },
}