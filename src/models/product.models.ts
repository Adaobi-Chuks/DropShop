import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/database.configs";

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

export default Product;