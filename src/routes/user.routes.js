module.exports = app => {
    const users = require("../controllers/user.controller.js")
  
    var router = require("express").Router()
   
    router.get('/', users.findAll)
    router.post("/register", users.register)
    router.post("/login", users.login)
    router.post("/logout", users.logout)

    router.get("/shared/:noteId", users.sharedWith)
    router.delete("/:noteId/:userId", users.deleteAccess)

    app.use('/api/users', router)
}