const { authSignUp } = require("../middleware")
const Auth = require("../controllers/auth.controller")

module.exports = app => {
    app.use((req,res,next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )

        next()
    })

    app.post(
        '/api/auth/signup', 
        [
            authSignUp.checkDuplicateUsernameOrEmail, 
            authSignUp.checkRole 
        ], 
        Auth.signup
    )

    app.post('/api/auth/signin', Auth.signin)
}