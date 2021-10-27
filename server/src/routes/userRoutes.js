import express from "express";

import {
   userLogin,
   leave,
   getProfileID,
   getProfileUserName,
   getUserLeaveReq,
} from "../controllers/userController";

const router = express.Router();

router.get("/profileID/:id", getProfileID); //getprofile by id
router.get("/profileUsername/:username", getProfileUserName); //getprofile by id
router.post("/login", userLogin);
router.post("/leave", leave);
router.get("/getUserLeaveREQ/:username", getUserLeaveReq);

export default router;
