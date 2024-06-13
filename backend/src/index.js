import express from 'express'
import {connectDB} from './config/DBConnect.js'
import pdfRouter from './routes/pdf.routes.js'
import userRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import auth from './middlewares/authMiddleware.js'
import {config} from 'dotenv'
import cors from 'cors';
config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;

//introduce routes to the server
app.use('/pdf',auth, pdfRouter)
app.use('/auth', userRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running at port ${PORT}`);
    })
})
