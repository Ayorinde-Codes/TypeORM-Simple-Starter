import { Router } from "express";
import UserController from "../controllers/UserController";
import { validateJwt } from "../middlewares/validateJwt";
import { validateRole } from "../middlewares/validateRole";

const router = Router();

//Get all users
router.get("/", [validateJwt, validateRole(["ADMIN"])], UserController.listAll);

// Get one user with id
router.get(
  "/:id([0-9]+)",
  [validateJwt, validateRole(["ADMIN"])],
  UserController.getOneById
);

//Create a new user for Admin or User
router.post("/",  UserController.newUser);

//Edit user by id
router.patch(
  "/:id([0-9]+)",
  [validateJwt, validateRole(["ADMIN"])],
  UserController.editUser
);

//Delete one user by id
router.delete(
  "/:id([0-9]+)",
  [validateJwt, validateRole(["ADMIN"])],
  UserController.deleteUser
);

export default router;