import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateJwt } from "../middlewares/validateJwt";

const router = Router();
//Login route
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [validateJwt], AuthController.changePassword);

export default router;