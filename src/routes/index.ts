
import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import userinfo from "./userinfo";



const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/userinfo", userinfo);



export default routes;