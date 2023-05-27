interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: Date;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

type IUserOpt = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export {
    IUser,
    IUserOpt
};