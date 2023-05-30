import { Router } from "express";
import UserController from '../controllers/user.controller';
const router = Router();
const {
    createUser,
    getUserById,
    getUsers,
    update,
    softDelete,
    hardDelete,
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
//soft delete user
router.delete("/:userId", softDelete);
//hard delete user
router.delete("/delete/:userId", hardDelete);
//login a user
router.post("/login", login);
//logout a user
router.post("/logout", logout);

export default router;