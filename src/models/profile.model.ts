import { DATEONLY, DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/database.configs";
import User from "./user.model";

class Profile extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public phoneNumber!: string;
    public address!: string;
    public birthDate!: string;
}

Profile.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "First name is required."
            },
            notEmpty: {
                msg: "First name cannot be empty."
            },
            is: {
                args: ["^[A-Za-z\\s'-]+$", 'i'],
                msg: 'Invalid first name format.'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Last name is required."
            },
            notEmpty: {
                msg: "Last name cannot be empty."
            },
            is: {
                args: ["^[A-Za-z\\s'-]+$", 'i'],
                msg: 'Invalid last name format.'
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull:  {
                msg: "Phonenumber cannot be null"
            },
            is: {
                args: ["^(\\+?234|0)([789]\\d{9})$"],
                msg: "Invalid phonenumber"
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Last name is required."
            },
            notEmpty: {
                msg: "Last name cannot be empty."
            }
        }
    },
    birthDate: {
        type: DATEONLY,
        allowNull: false,
        validate: {
            notNull:  {
                msg: "Birthdate cannot be null"
            },
            isDate: {
                args: true,
                msg: "Invalid birthdate format. Please provide a valid date."
            },
            isBefore: {
                args: new Date().toISOString().split('T')[0],
                msg: 'Birthdate must be before the current date.',
            }
        }
    }
}, {
    sequelize,
    tableName: 'profiles',
    timestamps: true,
    updatedAt: false,
    createdAt: "createTimestamp",
    paranoid: true
});

User.hasOne(Profile, {
    foreignKey: {
        name: "userId",
        allowNull: false
    }
});
Profile.belongsTo(User, {
    foreignKey: "userId"
});

export default Profile;