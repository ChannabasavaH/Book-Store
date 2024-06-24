import express from 'express';
import User from '../models/userSchema.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      let { displayName, email } = req.body;
      const newUser = new User({ displayName, email, });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/google/login', async (req, res) => {
    try {
        const { displayName, email } = req.body;
        let user = await User.findOne({ email: email });

        if (!user) {
            user = new User({ displayName, email });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login',async (req,res) => {
    try {
        res.status(200).json({ message: 'User authenticated' });
    } catch (error) {
        res.status(500).json({message: error});
    }
})

export default router;