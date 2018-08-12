const mongoose = require('mongoose')

const constants = require('../common/constants')
const encryption = require('../infrastructure/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        minlength: [1, 'Username should be min 1 symbols long!'],
        maxlength: [20, 'Username should be max 20 symbols long!'],
        required: REQUIRED_VALIDATION_MESSAGE,
        unique: true
    },
    creationDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now,
        required: REQUIRED_VALIDATION_MESSAGE
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: REQUIRED_VALIDATION_MESSAGE,
        unique: true
    },
    hashedPass: {
        type: mongoose.SchemaTypes.String
    },
    roles: [{
        type: mongoose.SchemaTypes.String
    }],
    salt: {
        type: mongoose.SchemaTypes.String
    }
})

// Do not change to arrow function
userSchema.method({
    authenticate: function (password) {
        return encryption
            .generateHashedPassword(this.salt, password) === this.hashedPass
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User

module.exports.seedUsers = () => {
    User.find({})
        .then(users => {
            if (users.length > 0) {
                return
            }

            let email = 'admin@gmail.com'
            let firstName = 'admin'
            let lastName = 'admin'
            let roles = constants.USER_ROLES
            let username = 'admin'

            for (let i = 1; i <= 60; i++) {
                if (i > 1) {
                    i = i >= 10 ? i : pad(i, 2)
                    email = `user${i}@gmail.com`
                    firstName = `user${i}`
                    lastName = `user${i}`
                    roles = []
                    username = `user${i}`
                }

                let salt = encryption.generateSalt()
                let hashedPass = encryption.generateHashedPassword(salt, 'Admin1')

                User.create({
                    email: email,
                    firstName: firstName,
                    hashedPass: hashedPass,
                    lastName: lastName,
                    roles: roles,
                    salt: salt,
                    username: username
                })
            }
        })
}

function pad(num, size) {
    let s = num + ''
    while (s.length < size) s = '0' + s
    return s
}
