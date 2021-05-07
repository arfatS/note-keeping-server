module.exports = (sequelize, Sequelize) => {

    const Note = sequelize.define("note", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    })

    return Note
}