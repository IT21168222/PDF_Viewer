import express from 'express';
import multer from 'multer';
import { uploadPdf, getPdf, getAllPdfs } from '../controllers/pdf.controller.js';

const pdfRouter = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// POST route to upload PDF
pdfRouter.post('/upload', upload.single('pdf'), uploadPdf);

// GET route to read PDF by ID
pdfRouter.get('/get/:id', getPdf);

// GET route to read all PDF from database
pdfRouter.get('/get', getAllPdfs);



export default pdfRouter;