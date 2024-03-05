const process = require("process");
const dotenv = require("dotenv");
const mysql = require("mysql")

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    enableKeepAlive: true
})

module.exports= db