const Sequelize = require("sequelize")
const dbConfig = require("../config/db.config")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Insert Models
db.examples = require("./example.model.js")(sequelize,Sequelize)

db.users = require("./users.model.js")(sequelize,Sequelize)
db.roles = require("./roles.model.js")(sequelize,Sequelize)
db.users.belongsToMany(db.roles, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
})
db.roles.belongsToMany(db.users, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
})
db.ROLES = ["user", "moderator", "admin"]

module.exports = db