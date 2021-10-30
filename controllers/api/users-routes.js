const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Users} = require('../../models');
const saltRounds = 10;

// Create a new user
router.post('/', async (req, res) => {
    try {
        // If the user is already logged in, ask them to log out before creating a new user
        if(req.session.loggedIn) {
            res.status(403).json({response: "You must log out before creating a new account."});
        }

        // Otherwise, create the new user and log them in.
        const user = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, saltRounds)
        });
        res.redirect(307, '/api/login');
    } catch (err) {
        res.status(500).json(err);
    }
});


// Delete a user
router.delete('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});

// Modify a user
router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});



module.exports = router;