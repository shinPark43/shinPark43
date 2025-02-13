import { Router } from 'express';
import User from '../models/User.js'; // Import the User model

const router = Router();

router.get('/', async (req, res) => {
    res.status(200).send('Welcome to the user route');
});

// Create a new user
router.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body); // Create a new user with the request body
        await user.save(); // Save the user

        res.status(201).send(user); // Respond with the user
    } catch (error) {
        res.status(400).send(error); // Respond with an error
    }
});

router.post('/userLogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }

        res.status(200).send(user); // Respond with the user
        // const token = await user.generateAuthToken(); // Generate an authentication token
        // res.send({ user, token });  // Respond with the user and token
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;