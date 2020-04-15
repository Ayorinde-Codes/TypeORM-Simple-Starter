import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {validate} from 'class-validator';
import {UserInfo} from '../entity/UserInfo';

class UserInfoController{

static newUserInfo=async(req: Request, res:Response)=> {

    if (!req.file) {
        return res.status(400).send('Please select an image to upload');
    }
    
    else { 

        let{phone, sex, dob, address} = req.body;
        const id = res.locals.jwtPayload.userId;
        let imagePath= req.file.path;

        const userRepository= getRepository(UserInfo);

        // if users exist in users table then update users info
        let user= await userRepository.findOneOrFail({where: {user: id}})

        if (user){
            user.address= address;
            user.phone= phone;
            user.sex=sex;
            user.dob=dob;
            user.photo= imagePath;

            await userRepository.save(user);
        }
        else{

            let userinfo= new UserInfo();

            userinfo.address= address;
            userinfo.phone= phone;
            userinfo.sex=sex;
            userinfo.dob=dob;
            userinfo.user= res.locals.jwtPayload.userId;
            user.photo= imagePath;
        
            const errors= await validate(userinfo);
        
            if (errors.length > 0){
                res.status(400).send(errors)
                return;
            }

            try{
                await userRepository.save(userinfo);
            }

            catch(e){
                res.status(404).send("unable to Add user info");
                return;
            }
        
            res.status(201).send("user info added succesfully");
        }

        res.status(200).send("user Information Saved");

        } 
}

static editUserInfo= async (req:Request, res:Response) =>{

// edit a paticular user info 
const id = req.params.id;
let imagePath= req.file.path;


let{phone, sex, dob, address} =req.body;

const userRepository= getRepository(UserInfo);

let user= await userRepository.findOneOrFail({where: {id}})

    user.address= address;
    user.phone= phone;
    user.sex=sex; 
    user.dob=dob;
    user.photo= imagePath;

    const errors= await validate(user);

    if (errors.length < 0 ){
        res.status(400).send(errors)
    }
    
    try{
        await userRepository.save(user);
    }
    catch(e){
        res.status(404).send("unable to Update user info");
        return;
    }

    res.status(204).send("user info added succesfully");

}

}

export default UserInfoController;