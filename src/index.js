const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8000
const app = express()

const db = require("./models");
db.sequelize.sync({})
// db.sequelize.sync({ force: true })
// .then(() => {
//     console.log("Database dropped and refreshed.")
// })

//App middlewares
app.use(cors({ origin : 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({extended : false}))


//App routes
require("./routes/user.routes")(app);
require("./routes/note.routes")(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
