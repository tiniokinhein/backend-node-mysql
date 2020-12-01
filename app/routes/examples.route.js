module.exports = app => {
    const Examples = require("../controllers/example.controller.js")
    const exampleImage = require('../middleware/exampleImage.js')
    const router = require("express").Router()

    router.get('/', Examples.findAll)
    router.get('/:slug', Examples.findOne)
    router.post('/', exampleImage.single('image'), Examples.create)
    router.put('/:slug', Examples.update)
    router.delete('/', Examples.deleteAll)
    router.delete('/:slug', Examples.deleteOne)

    app.use('/api/examples/', router)
}