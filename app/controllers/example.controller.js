const slugify = require("slugify")
const db = require("../models")
const Examples = db.examples
const Op = db.Sequelize.Op

exports.create = (req,res) => {

    if(!req.body.title) {
        res.status(400).send({
            message: 'Required Title field!'
        })
    }

    const imageUrl = req.protocol + '://' + req.get('host')

    const examples = {
        title: req.body.title,
        slug: slugify(req.body.title.toLowerCase()),
        image: imageUrl + '/public/assets/exampleImages/' + req.file.filename,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Examples
    .create(examples)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findAll = (req,res) => {

    const title = req.query.title
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null

    Examples 
    .findAll({ where: condition })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findOne = (req,res) => {
    Examples 
    .findOne({
        slug: req.params.slug
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.update = (req,res) => {
    Examples
    .update(req.body, {
        where: {
            slug: req.params.slug
        }
    })
    .then(num => {
        if(num == 1) {
            res.send({ message: 'Update successfully!' })
        } else {
            res.send({ message: `Cannot find this slug = ${req.params.slug}` })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.deleteOne = (req,res) => {
    Examples 
    .destroy({
        where: {
            slug: req.params.slug
        }
    })
    .then(num => {
        if(num == 1) {
            res.send({ message: `${req.params.slug} deleted successfully!` })
        } else {
            res.send({ message: `Cannot find this slug = ${req.params.slug}` })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.deleteAll = (req,res) => {
    Examples
    .destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} examples deleted successfully` })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}