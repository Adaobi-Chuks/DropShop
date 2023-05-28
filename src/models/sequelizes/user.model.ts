import { DATEONLY, DataTypes, Model } from "sequelize";
import { sequelize } from "../../configs/database.configs";
import bcrypt from "bcrypt";

class User extends Model {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public phoneNumber!: string;
    public role!: 'seller' | 'buyer' | 'delivery' | 'admin';
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
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('seller', 'buyer', 'delivery', 'admin'),
        allowNull: true,
        defaultValue: "buyer"
    },
    birthDate: {
        type: DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    createdAt: "createTimestamp"
});

export default User;