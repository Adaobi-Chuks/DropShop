import Profile from "../models/profile.models";
import User from "../models/user.models";

export default function userProfileAssociation(): void {
    User.hasOne(Profile, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
        onDelete: "CASCADE"
    });

    Profile.belongsTo(User, {
        foreignKey: {
            name: "userId",
        },
        onDelete: "CASCADE"
    });
}