import express from "express";
import { isSignedIn } from '../controllers/auth';
import { getAllUsers, getUser, updateProfile, updateUserLanguage,updateUserLooking, updateUserMonth } from './../controllers/user';
import{ hello} from "../controllers/user"
const router =express.Router();


router.get("/getuser",hello,isSignedIn,getUser)
router.put("/updateprofile",isSignedIn,updateProfile)

router.get("/getallusers",isSignedIn,getAllUsers)

router.post("/updatelanguage",isSignedIn,updateUserLanguage);
router.post("/looking",isSignedIn,updateUserLooking);
router.post("/month",isSignedIn,updateUserMonth);


export default router;