module.exports = {
    HOST: "https://as-note-keeping-server.herokuapp.com/",
    USER: process.env.USER || "root",
    PASSWORD: process.env.PASSWORD ||  "",
    DB: process.env.DB || "note-keeping",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}