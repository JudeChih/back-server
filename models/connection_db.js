// DataBase
const config = require('../config/development_config');
const mysqlt = require("mysql");

const connection = mysqlt.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port
});

connection.connect(err => {
    if (err) {
        console.log('連結失敗，請重啟！');
    } else {
        console.log('連結成功！');
    }
});

module.exports = connection;