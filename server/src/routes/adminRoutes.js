import express from "express";

import {
   compose,
   getAdmin,
   getAllLeaveReq,
   newUser,
   updateUser,
   leaveUpdate,
   getAllUsers,
   deleteUser,
   blockOrUnblock,
   getAUser,
} from "../controllers/adminContoller";

const router = express.Router();

router.get("/", getAdmin);
router.get("/allusers", getAllUsers);
router.get("/getUser/:id", getAUser);
router.post("/compose", compose);
router.get("/allleaveREQ", getAllLeaveReq);
router.post("/newuser", newUser);
router.put("/updateuser/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.put("/leaveUpdate/:id", leaveUpdate);
router.put("/blockOrUnblock/:username/:id", blockOrUnblock);

export default router;
