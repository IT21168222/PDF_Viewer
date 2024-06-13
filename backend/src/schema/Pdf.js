import mongoose from 'mongoose';

const PdfSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  filename: String,
  uploadDate: { type: Date, default: Date.now }
});

const Pdf = mongoose.model('Pdf', PdfSchema);
export default Pdf;
