import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/database.configs";
import Order from "./order.models";
import Product from "./product.models";

class OrderItem extends Model {
  public id!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quantity is required.",
        },
        min: {
          args: [1],
          msg: "Quantity must be at least 1.",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "orderItems",
    timestamps: true,
  }
);

OrderItem.belongsTo(Order, {
  foreignKey: {
    name: "orderId",
    allowNull: false
  },
});

OrderItem.belongsTo(Product, {
  foreignKey: {
    name: "productId",
    allowNull: false
  },
});

// Product.hasMany(OrderItem, {
//   foreignKey: {
//     name: "orderId",
//     onDelete: "CASCADE",
//     allowNull: false,
//   },
// });

// Order.hasMany(OrderItem, {
//   foreignKey: {
//     name: "orderId",
//     allowNull: false,
//     onDelete: "CASCADE",
//   },
// });

export default OrderItem;
