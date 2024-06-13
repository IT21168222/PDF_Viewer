import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    // console.log(token)

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        jwt.verify(token, process.env.SECRET_KEY);

        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

export default auth;
