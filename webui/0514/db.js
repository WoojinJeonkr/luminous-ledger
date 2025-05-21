require('dotenv').config({ path: './.env' });

let mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWD,
    database: 'webui'
});

let selectQuery = `select * from post`;

connection.query(selectQuery,
    function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    }
)

module.exports = connection;
