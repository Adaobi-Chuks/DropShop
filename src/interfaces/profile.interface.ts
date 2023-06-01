interface IProfile {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    birthDate: Date;
    role: string;
};

type IProfileOpt = Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>;

export {
    IProfile,
    IProfileOpt
};