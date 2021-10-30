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
    try {
        // get the user
        const user = await Users.findOne({
            where: {
                id: req.params.id
            }
        });
        // If the user isn't found, return with a 404
        if(!user) {
            res.status(404).json({response: "User not found."});
            return;
        }

        //If the user found is not logged in as the current user, return with a 403
        if(user.getID() !== req.session.curUserID) {
            res.status(403).json({response: "Must be logged in as user to delete account."});
            return;
        }

        // Otherwise, delete the user and log out.
        const username = user.username;
        await user.destroy();
        console.log(`Deleted user ${username}.`);
        res.status(200).json({response: "User deleted successfully."});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Modify a user
router.put('/:id', async (req, res) => {
    // TODO
    res.status(200).send(req.params.id);
});



module.exports = router;