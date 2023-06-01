import { Router } from "express";
import ProfileController from '../controllers/profile.controllers';
const router = Router();
const {
    createProfile
} = new ProfileController();

//create a profile
router.post("/", createProfile);

export default router;