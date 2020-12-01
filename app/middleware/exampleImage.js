const multer = require("multer")
const { v4: uuidv4 } = require("uuid")

const ImageFileFilter = (req,file,cb) => {
    if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
}

const ImageStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, __basedir + '/public/assets/exampleImages/')
    },
    filename: (req,file,cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4 + '-' + fileName)
    }
})

const exampleImage = multer({
    storage: ImageStorage,
    fileFilter: ImageFileFilter
})

module.exports = exampleImage