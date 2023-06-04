import Product from "../models/product.models";
import Image from "../models/image.models";

export default function productImageAssociation(): void {
    Product.hasMany(Image, {
        foreignKey: {
            name: "productId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
      
    Image.belongsTo(Product, {
        foreignKey: {
            name: "productId",
        },
        onDelete: "CASCADE"
    });
}