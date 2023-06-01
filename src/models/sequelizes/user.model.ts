import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../configs/database.configs";
import bcrypt from "bcrypt";
import Profile from "./profile.model";

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: 'user' | 'admin';
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: "user"
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    // updatedAt: false,
    // createdAt: "createTimestamp",
});

export default User;