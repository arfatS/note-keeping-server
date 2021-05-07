module.exports = app => {
    const notes = require("../controllers/note.controller.js")
  
    var router = require("express").Router()
  
    router.post("/", notes.create)

    router.get("/user/:userId", notes.findAll)
    router.get("/shared/:userId", notes.sharedToMe)

    router.get("/:id", notes.findOne)
    router.put("/:id", notes.update)
    router.delete("/:noteId/:userId", notes.delete)
    
    router.post("/share", notes.share)

    app.use('/api/notes', router)
}