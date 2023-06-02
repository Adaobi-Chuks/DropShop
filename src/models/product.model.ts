import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/database.configs";
import User from "./user.model";

class Product extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
}, {
  sequelize,
    tableName: "products",
    timestamps: true
});

User.hasMany(Product, {
  foreignKey: {
    name: "userId",
    allowNull: false
  }
});

Product.belongsTo(User, {
  foreignKey: "userId",
});

// Product.belongsTo(Category, {
//   foreignKey: 'categoryId',
// });
// Category.hasMany(Product, {
//   foreignKey: 'categoryId',
// });

// Product.hasMany(Review, {
//   foreignKey: 'productId',
//   onDelete: 'CASCADE',
// });
// Review.belongsTo(Product, {
//   foreignKey: 'productId',
// });

// Product.hasMany(Image, {
//   foreignKey: 'productId',
//   onDelete: 'CASCADE',
// });
// Image.belongsTo(Product, {
//   foreignKey: 'productId',
// });

// Product.belongsToMany(Attribute, { through: 'ProductAttribute' });
// Attribute.belongsToMany(Product, { through: 'ProductAttribute' });

export default Product;