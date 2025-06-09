import mysql from "mysql2";

import "dotenv/config"


 export const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:"projeto"
})


