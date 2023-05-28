import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
const {
    createUser,
    getUserById,
    getUsers,
    update,
    destroy,
    login,
    logout
} = new UserController();

//create a user or signup
router.post("/", createUser);
//get a user with an id
router.get("/:userId", getUserById);
//get users
router.get("/", getUsers);
//edit any user details
router.patch("/:userId", update);
// delete user
router.delete("/:userId", destroy);
//login a user
router.post("/login", login);
//logout a user
router.post("/logout", logout);

export default router;