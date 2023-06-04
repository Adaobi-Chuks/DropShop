import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/database.configs";
import User from "./user.models";

class Order extends Model {
  public id!: number;
  public orderNumber!: string;
  public status!: string;
}

Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

Order.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});


export default Order;
