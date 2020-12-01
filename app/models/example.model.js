module.exports = (sequelize,Sequelize) => {
    const Examples = sequelize.define('examples', {
        title: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    })

    return Examples
}