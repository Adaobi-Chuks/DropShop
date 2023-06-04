import User from "../models/user.models";
import Product from "../models/product.models";

export default function userProductAssociation(): void {
    User.hasMany(Product, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
      
    Product.belongsTo(User, {
        foreignKey: {
            name: "userId",
        },
        onDelete: "CASCADE"
    });
}