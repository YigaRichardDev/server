
import mysql from 'mysql2';

import { connectionConfig } from '../lib/indext';




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


