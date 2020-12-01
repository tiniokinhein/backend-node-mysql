const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()

global.__basedir = __dirname

const db = require("./app/models")
const Role = db.roles
// db.sequelize.sync()

// Create Users and Roles First
db.sequelize.sync({ force: true }).then(() => {
    console.log('Re-sync DB')
    initial()
})
//

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Declare
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

// Routes
require("./app/routes/auths.route")(app)
require("./app/routes/examples.route")(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Listen to http://localhost:${PORT}`)
})



function initial() {
    Role.create({
        id: 1,
        name: "user"
    })

    Role.create({
        id: 2,
        name: "moderator"
    })

    Role.create({
        id: 3,
        name: "admin"
    })
}