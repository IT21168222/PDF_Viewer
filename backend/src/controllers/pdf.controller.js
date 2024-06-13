import Pdf from '../schema/Pdf.js';

export const uploadPdf = async (req, res) => {
  try {
    const newPdf = new Pdf({
      data: req.file.buffer,
      contentType: req.file.mimetype,
      filename: req.file.originalname
    });

    await newPdf.save();
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPdf = async (req, res) => {
    try {
      const pdf = await Pdf.findById(req.params.id);
  
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found' });
      }
  
      res.set('Content-Type', pdf.contentType);
      res.send(pdf.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const getAllPdfs = async (req, res) => {
    try {
      const pdfs = await Pdf.find({}, "_id");
      res.status(200).json(pdfs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };