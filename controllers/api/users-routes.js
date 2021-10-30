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
        const user = await Users.findByPk(req.params.id)
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
    try {
        // Get the user
        const user = await Users.findByPk(req.params.id);
        // If the user isn't found, return a 404
        if(!user) {
            res.status(404).json({response: "User not found"});
            return;
        }
        // If the user isn't currently logged in, return a 403
        if(user.getID() !== req.session.curUserID) {
            res.status(403).json({response: "Must be logged in as user to modify account information."});
            return;
        }
        // Otherwise, update the user and return a status 200
        await user.update({
            email: req.body.email,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, saltRounds)
        });
        // TODO - remove hashed password from this response
        res.status(200).json({user: user, response: "User updated successfully"});
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;