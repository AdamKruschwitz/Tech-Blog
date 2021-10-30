const { Users } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userData = [
    {
        username: "JakNDaxter",
        email: "ratch8Nclank@gmail.com",
        password: bcrypt.hashSync('PS1forever!', saltRounds)
    },
    {
        username: "LarryComplains",
        email: "LarryAire@gmail.com",
        password: bcrypt.hashSync('EverythingSucks4Me', saltRounds)
    },
    {
        username: "robocop",
        email: "ro@bo.cop",
        password: bcrypt.hashSync('robocop!', saltRounds)
    }
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;