import express from "express";

import { Login, resetPassword, getData } from "../controllers/loginController";

const router = express.Router();

router.get("/getdata/:id", getData);

router.post("/login", Login);
router.put("/resetpassword", resetPassword);

export default router;
