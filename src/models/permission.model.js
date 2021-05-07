module.exports = (sequelize, Sequelize) => {

    const Permission = sequelize.define("permission", {
        role: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        noteId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });
    

    return Permission;
};