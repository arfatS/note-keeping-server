const bcrypt = require("bcryptjs")

const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const db = require("../models")
const User = db.users
const Permission = db.permissions

const loggedIn = localStorage.getItem('loggedIn')




//User register
exports.register = (req, res) => {

    if (!req.body) {
        return res.status(400).send({ error: 'Body cannot be empty ' })
    }

    const { name, email, password } = req.body

    const user = {
        name,
        email,
        password: bcrypt.hashSync(password, 8)
    }

    User.create(user)
        .then(user => {
            localStorage.setItem('loggedIn', user.dataValues.id)
            res.send({ user })
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ error })
        })
}

//User login
exports.login = (req, res) => {
    const { email, password } = req.body

    User.findAll({ where: { email } })
        .then(user => {

            if (user.length) {

                if (bcrypt.compareSync(password, user[0].password)) {
                    localStorage.setItem('loggedIn', user)
                    res.send({ user })
                }
                else {
                    res.send(false)
                }
            } else {
                res.send(false)
            }
        })
        .catch(error => {
            res.status(500).send({ error })
        })
}


//User logout
exports.logout = (req, res) => {
    localStorage.removeItem('loggedIn')
    res.send({ message: 'Logged out successfully' })
}

//Find all users
exports.findAll = (req, res) => {

    User.findAll({ where: {} })
        .then(users => {
            res.send({ users })
        })
        .catch(error => {
            res.status(500).send({ error })
        })

}

//Find users shared with
exports.sharedWith = (req, res) => {
    const { Op } = require("sequelize");


    const noteId = req.params.noteId;

    Permission.findAll({
        where:
        {
            noteId,
            [Op.or]: [{ role: 'Contributor' }, { role: 'Reader' }]
        }
    })
        .then(data => {

            let users = []
            data.forEach((d, index) => {

                User.findByPk(d.userId)
                    .then(u => {
                        u.dataValues.role = d.role
                        users.push(u)

                        if (index === data.length - 1) {
                            res.send({ users })
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

//Delete user access
exports.deleteAccess = (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.params.userId;

    Permission.destroy({ where: { noteId, userId } })
        .then(data => {
            res.send({ data })
        })
        .catch(error => {
            res.status(500).send({ error })
        })


};
