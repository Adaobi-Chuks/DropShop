import Order from "../models/order.models";
import OrderItem from "../models/orderItem.models";

export default function orderOrderitemAssociation(): void {
    Order.hasMany(OrderItem, {
        foreignKey: {
            name: "orderId",
            allowNull: false,
        },
        onDelete: "CASCADE"
    });

    OrderItem.belongsTo(Order, {
        foreignKey: {
            name: "orderId",
        },
        onDelete: "CASCADE"
    });
}