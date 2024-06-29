import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../schema/User.js';

const ROLE = "user"; // default account type

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const role = ROLE;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ username: user.username }, process.env.RE_SECRET_KEY, { expiresIn: '24h' });
            res.json({ accessToken, refreshToken });
        } else {
            res.status(401).json({ message: 'Username or password incorrect' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(401).send('Access denied. No refresh token provided.');
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.RE_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '10m' });
        res.json({ accessToken });
    });
};

export const logoutUser = (req, res) => {
    res.send('Logged out successfully');
};


