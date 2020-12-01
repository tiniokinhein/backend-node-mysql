const db = require("../models")
const User = db.users
const ROLES = db.ROLES

checkDuplicateUsernameOrEmail = (req,res,next) => {
    // Username
    User 
    .findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user) {
            res.status(400).send({
                message: 'Failed! Username already in use!'
            })
            return
        }

        // Email
        User 
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(user) {
                res.status(400).send({
                    message: 'Failed! Email already in use!'
                })
                return
            }

            next()
        })
    })
}

checkRole = (req,res,next) => {
    if(req.body.roles) {
        for(let i=0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role does not exist = ${req.body.roles[i]}`
                })
                return
            }
        }
    }

    next()
}

const authSignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRole: checkRole
}

module.exports = authSignUp