import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/database.configs";
import Product from "./product.models";

class Image extends Model {
    public id!: number;
    public url!: string;
}

Image.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Image URL is required.",
            },
            notEmpty: {
                msg: "Image URL cannot be empty.",
            },
            isUrl: {
                msg: "Invalid image URL format.",
            },
        },
    },
    },{
        sequelize,
        tableName: "images",
        timestamps: true,
    }
);
Product.hasMany(Image, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
});

Image.belongsTo(Product, {
    foreignKey: {
        name: "productId",
        allowNull: false,
    },
});

export default Image;