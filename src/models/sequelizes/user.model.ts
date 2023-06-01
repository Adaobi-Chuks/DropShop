import { DATEONLY, DataTypes, Model } from "sequelize";
import { sequelize } from "../../configs/database.configs";
import bcrypt from "bcrypt";

class User extends Model {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public phoneNumber!: string;
    public role!: 'user' | 'admin';
    public birthDate!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:  {
                msg: "Fullname cannot be null"
            },
            max: {
                args: [50],
                msg: "Maximum characters exceeded for fullname"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:  {
                msg: "Must be a valid email address"
            },
            notNull:  {
                msg: "Email cannot be null"
            } 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        },
        validate: {
            notNull:  {
                msg: "Password cannot be null"
            },
            min: {
                args: [6],
                msg: "Password must be greater than 6 characters"
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
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: "user"
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
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    createdAt: "createTimestamp",
    paranoid: true
});

export default User;