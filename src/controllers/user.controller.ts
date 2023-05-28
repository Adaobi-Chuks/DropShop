import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import UserService from "../services/user.service";
import { IUser } from "../interfaces/user.interface";
const {
    create,
    findOne,
    findOneById,
    findOneWithFields,
    findAll,
    findAllWithFields,
    update,
    destroy,
    generateAuthToken
} = new UserService();
const {
    DUPLICATE_EMAIL,
    DUPLICATE_PHONENUMBER,
    CREATED,
    FETCHEDALL,
    INVALID_ID,
    FETCHED,
    UPDATED,
    DELETED,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    LOGGEDIN,
    LOGGEDOUT
} = MESSAGES.USER;

export default class UserController {
    async createUser(req: Request, res: Response) {
        const {email, phoneNumber} = req.body;

        //checks if another user with email exists
        if (await findOne(email)) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_EMAIL
            });
        }
        //checks if another user with phoneNumber exists
        if (await findOne(phoneNumber)) {
            //sends an error if the userName exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_PHONENUMBER
            });
        }
        //creates a user if the email and phonenumber doesn't exist
        const createdUser = await create(req.body);
        const token = generateAuthToken(createdUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.status(201)
            .send({
                Success: true,
                Message: CREATED,
                User: createdUser
            });
    }

    async getUserById(req: Request, res: Response) {
        //check if user exists
        const user = await findOneById(req.params.userId);
    
        if (!user) {
            return res.status(404).send({
                Success: false,
                Message: INVALID_ID
            });
        }
        return res.status(200).send({
          Success: true,
          Message: FETCHED,
          User: user
        });
    }

    async getUsers(req: Request, res: Response) {
        const users = await findAll({});
        return res.status(200).send({
          Success: true,
          Message: FETCHEDALL,
          Users: users
        });
    }

    async editUserById(req: Request, res: Response) {
        const id = req.params.userId;
        const data = req.body;
        const userToEdit = await findOneById(id);
        
        //check if the user exists
        if(!userToEdit) {
            return res.status(404).send({
                success: false,
                message: INVALID_ID
            })
        }
        //check if email already exist if the email needs to be updated
        if(data.email){
            const userEmailWithEmail = (await findOne({ email: data.email }))
            if(userEmailWithEmail){
                if(userEmailWithEmail.id.toString() !== id){
                    return res.status(403).send({
                        success: false,
                        message: DUPLICATE_EMAIL
                    })
                }
            }
        }
        const updatedUser = await update(id, data);
        //regenerating token cuz user details was changed
        const token = generateAuthToken(updatedUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.status(200).send({
            success: true,
            message: UPDATED,
            User: updatedUser
        })
    }

    async deleteById(req: Request, res: Response) {
        const id = req.params.userId;

        //check to see if a user with id exists
        const userToDelete = await findOneById(id);
        //deletes the user if the id exist
        if(userToDelete) {
            const userDeleted = await destroy(id);
            if(userDeleted) {
                return res.status(201).send({
                    success: true,
                    message: DELETED
                });
            }
            //A user shouldn't have access to unauthenticated requests if the user deletes his/her account
            const token = generateAuthToken(userToDelete as any);
            res.cookie(token, "", {
                httpOnly: true, maxAge: MAXAGE * 1000
            });
        }
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: INVALID_ID
            });   
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const _user = await findOne(email);
        if (!_user) {
            return res.status(400)
                .send({ 
                    success: false, 
                    message: INVALID_EMAIL
                });
        }
        
        const validPassword = await bcrypt.compare(password, _user.password);
        if (!validPassword) {
            return res.status(400)
                .send({ 
                    success: false, 
                    message: INVALID_PASSWORD
                });
        }
        const token = generateAuthToken(_user as unknown as IUser);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: MAXAGE * 1000
        });
        return res.status(200).send({
            success: true,
            message: LOGGEDIN,
            user: _user 
        });
    }

    async logout(req: Request, res: Response) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1 
        });
        return res.status(200).send({
            success: true,
            message: LOGGEDOUT
        });
    }
}