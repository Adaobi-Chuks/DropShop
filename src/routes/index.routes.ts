import userRouter from "./user.routes";
import docRouter from "./doc.routes";
import profileRouter from "./profile.routes";
import { basePath } from "../configs/constants.config";

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/users`, userRouter);
    app.use(`${basePath}/profiles`, profileRouter);
    app.use(`${basePath}/docs`, docRouter);
};