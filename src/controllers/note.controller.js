const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const db = require("../models");

const Note = db.notes;
const Permission = db.permissions
const loggedIn = localStorage.getItem('loggedIn')

//Create a note
exports.create = (req, res) => {

    if (!req.body) {
        return res.status(400).send({ error: 'Body cannot be empty ' })
    }

    const note = {
        title: req.body.title,
        description: req.body.description
    }

    Note.create(note)
        .then(data => {

            const permission = {
                role: 'Owner',
                noteId: data.id,
                userId: req.body.userId
            }

            Permission.create(permission)
                .then(permission => {
                    res.send({ data, permission })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })

        })
        .catch(error => {
            res.status(500).send({ error })
        })
}

//Find all notes
exports.findAll = (req, res) => {

    const userId = req.params.userId;

    Permission.findAll({ where: { userId, role: 'Owner' } })
        .then(data => {

            let notes = []
            data.forEach((d, index) => {

                Note.findByPk(d.noteId)
                    .then(n => {
                        notes.push(n)

                        if (index === data.length - 1) {
                            res.send({ notes })
                        }
                    })
                    .catch(error => {
                        res.status(500).send({ error })
                    })
            })

        })
        .catch(error => {
            res.status(500).send({ error })
        })

}

//Find notes shared to me
exports.sharedToMe = (req, res) => {
    const { Op } = require("sequelize");

    const userId = req.params.userId;

    Permission.findAll({
        where:
        {
            userId,
            [Op.or]: [{ role: 'Contributor' }, { role: 'Reader' }]
        }
    })
        .then(data => {

            let notes = []
            data.forEach((d, index) => {

                Note.findByPk(d.noteId)
                    .then(n => {
                        n.dataValues.role = d.role
                        notes.push(n)

                        if (index === data.length - 1) {
                            res.send({ notes })
                        }
                    })
                    .catch(error => {
                        res.status(500).send({ error })
                    })
            })

        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ error })
        })
}

//Find one note
exports.findOne = (req, res) => {
    const id = req.params.id;

    Note.findByPk(id)
        .then(data => {
            res.send({ data })
        })
        .catch(error => {
            res.status(500).send({ error })
        })

}

//Update note
exports.update = (req, res) => {
    const id = req.params.id;

    Note.update(req.body, { where: { id } })
        .then(no => {
            if (no == 1) {
                res.send({ message: "Note updated successfully." })
            } else {
                res.send({ message: `Cannot update note with id=${id}.` })
            }
        })
        .catch(error => {
            res.status(500).send({ error })
        })
}

//Delete note
exports.delete = (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.params.userId;

    Permission.destroy({ where: { noteId, userId } })
        .then(data => {
            Note.destroy({ where: { id: noteId } })
                .then(no => {
                    if (no == 1) {
                        res.send({ message: "Note deleted successfully." })
                    } else {
                        res.send({ message: `Cannot delete note with id=${id}.` })
                    }
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })
        .catch(error => {
            res.status(500).send({ error })
        })
};


//Share notes
exports.share = (req, res) => {

    Permission.findAll({
        where:
        {
            userId: req.body.userId,
            noteId: req.body.noteId,
        }
    })
        .then(data => {

            if (!data.length) {
                Permission.create(req.body)
                    .then(permission => {
                        res.send({ permission })
                    })
                    .catch(error => {
                        res.status(500).send({ error })
                    })
            } else {
                return res.send({})
            }

        })
        .catch(error => {
            res.status(500).send({ error })
        })

}