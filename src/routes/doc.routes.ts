import express, {Request, Response} from "express";

const docRouter = express.Router()

docRouter.get("/", async(req: Request, res: Response) => {
    res.redirect("")
})

export default docRouter