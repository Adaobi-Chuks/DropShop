import Category from "../models/category.model";
import Product from "../models/product.models";

export default function productCategoryAssociation(): void {
    Category.hasMany(Product, {
        foreignKey: {
            name: "categoryId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
      
    Product.belongsTo(Category, {
        foreignKey: {
            name: "categoryId",
        },
        onDelete: "CASCADE"
    });
}