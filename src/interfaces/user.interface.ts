interface IUser {
    id: number;
    email: string;
    password: string;
    role: string;
};

type IUserOpt = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export {
    IUser,
    IUserOpt
};