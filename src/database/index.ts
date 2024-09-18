
import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config(); 

const connectionConfig = ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

});


export const connection = () =>{
    const connection = mysql.createConnection(connectionConfig);

    connection.connect((error) =>{
        if(error){
            console.error("Error connecting to my SQL: ", error.stack);
            return;
        }
        console.log("Connected to MYSQL as id:" + connection.threadId)
    });
    return connection;
}


