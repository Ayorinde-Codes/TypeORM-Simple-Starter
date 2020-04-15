import {Router} from 'express';
import UserInfoController from '../controllers/UserInfoController';
import {validateJwt} from '../middlewares/validateJwt';
import {validateRole} from '../middlewares/validateRole';
import {uploadUserImageMiddleware} from '../middlewares/uploadUserImageMiddleware';

const router= Router(); 


//Create patient info
router.post(
    "/",
    [validateJwt, validateRole(["ADMIN", "PATIENT"])], uploadUserImageMiddleware,
    UserInfoController.newUserInfo
);

//update users details
router.patch(
    "/:id([0-9]+)",
    [validateJwt, validateRole(["ADMIN"])], uploadUserImageMiddleware,
    UserInfoController.editUserInfo
);


export default router;