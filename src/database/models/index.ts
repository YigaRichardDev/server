import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../lib/indext";

export interface v2User extends Model{
    user_id: number;
    username: string;
    email: string;
    password: string;
}


export const User = sequelize.define<v2User>(
    "User", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "user"
    }
)



// Sync the model with the database
sequelize.sync({ force: true })  
    .then(() => {
        console.log("User table synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing User table:", error);
    });