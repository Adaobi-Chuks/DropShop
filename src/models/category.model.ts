import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/database.configs';
import Product from './product.model';

class Category extends Model {
    public id!: number;
    public name!: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Category name is required.",
            },
            notEmpty: {
                msg: "Category name cannot be empty.",
            },
            is: {
                args: ["^[A-Za-z\\s]+$", 'i'],
                msg: "Category name must only contain alphabetic characters and spaces.",
            },
            len: {
                args: [2, 50],
                msg: "Category name must be between 2 and 50 characters long.",
            },
        },
    },
},{
    sequelize,
    tableName: "categories",
    timestamps: false,
  }
);

Product.belongsTo(Category, {
    foreignKey: "categoryId",
});
Category.hasMany(Product, {
    foreignKey: "categoryId",
});

export default Category;