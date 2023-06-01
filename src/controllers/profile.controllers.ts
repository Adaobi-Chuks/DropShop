import { Request, Response } from "express";
import ProfileService from "../services/profile.service";
import { MESSAGES } from "../configs/constants.config";
const {
    create,
    findOne,
    findOneById,
    findOneWithFields,
    findAll,
    update,
    softDelete,
    hardDelete
} = new ProfileService();
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

export default class ProfileController {

    async createProfile(req: Request, res: Response) {
        const {phoneNumber} = req.body;

        //checks if another profile with phonenumber exists
        if (await findOne({phoneNumber: phoneNumber})) {
            //sends an error if the phonenumber exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_PHONENUMBER
            });
        }

        //creates a profile if the phonenumber doesn't exist
        const createdProfile = await create(req.body);
        return res.status(201)
            .send({
                Success: true,
                Message: CREATED,
                User: createdProfile
            });
    }
}