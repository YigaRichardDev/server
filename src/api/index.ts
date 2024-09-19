import express, { Request, Response } from 'express';
import { User } from '../database/models';
import bcrypt from 'bcrypt';


const router = express.Router();

// Route to add a new user
router.post('/add-user', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // check if email already exists 
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a user 
        const newUser = await User.create({ username, email, password: hashedPassword });

        return res.status(200).json({ message: 'User created successfully', user: newUser });
        
    } catch (err) {
        console.error('Error creating a user', err);
        return res.status(500).json({ message: 'Server Error!' });
    }
});

// Route for getting all users 
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();

        return res.status(200).json(users);

    } catch (err) {
        console.error('Error fetching user!', err);
        return res.status(500).json({ message: 'Server Error!' })
    }
});

// Route for getting a single user
router.get('/user/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        return res.status(200).json(user);

    } catch (err) {
        console.error('Error fetching user', err);
        return res.status(500).json({ message: 'Server Error!' });

    }
});

router.put('/user/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { username, email, password } = req.body

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.update(
            {
                username: username || user.username,
                email: email || user.email,
                password: hashedPassword,
            }
        );

        return res.status(200).json({message: 'User updated successfully', updatedUser});

    } catch (err) {
        console.error('Error updating user', err);
        return res.status(500).json({ message: 'Server Error!' });
    }
});

// Route for deleting a user
router.delete('/user/:id', async(req:Request, res:Response) => {
    const userId = req.params.id;

    try{
        const user = await User.findByPk(userId);

        if(!user){
            return res.status(404).json({message: 'User not found!'});
        }

        await user.destroy();

        return res.status(200).json({message: 'User deleted successfully'});

    }catch(err){
        console.error('Error deleting user', err);
        return res.status(500).json({message: 'Server Error'});
    }
})

export default router;