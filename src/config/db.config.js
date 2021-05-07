module.exports = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER || "root",
    PASSWORD: process.env.PASSWORD ||  "",
    DB: process.env.DB || "note-keeping",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}