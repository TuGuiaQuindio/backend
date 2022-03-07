import express from 'express';
import { Request, Response } from 'express';

import path from './paths/index';
import tokenValidator from '../validator/jwt.validator'
import { isAuth } from '../middleware/auth'
const router = express.Router();

/////////////////////////////////////////

const { params, validate } = tokenValidator; 

// Ruta del Home page
router.route(path.home)
    .get( params, validate, isAuth, async (req:Request, res:Response)=>{
        
        //Respondemos al cli 
        res.send('Welcome, Hello from /Home')
    });
    // .post((req:Request, res:Response)=>{
        
    // });

///////////////////////////////////////////////////////
// Exportamos la ruta
export default router;