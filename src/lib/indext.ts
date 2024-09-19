import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config(); 


export const connectionConfig = ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


export const sequelize = new Sequelize({
    dialect: "mysql",
    dialectModule: require("mysql2"),
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
  });