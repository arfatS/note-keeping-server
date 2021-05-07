module.exports = {
    HOST: process.env.DB_CONNECTION || "localhost",
    USER: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD ||  "",
    DB: process.env.DB_DATABASE || "note-keeping",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}