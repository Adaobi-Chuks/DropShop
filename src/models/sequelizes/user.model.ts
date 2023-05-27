import { DATEONLY, DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.configs";
import bcrypt from "bcrypt";

const User = sequelize.define('User', {
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
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    createdAt: "createTimestamp"
});
sequelize.sync();

export default User;