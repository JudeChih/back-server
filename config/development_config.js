require('dotenv').config()

module.exports = {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    },
    secret: process.env.MY_SECRET
}