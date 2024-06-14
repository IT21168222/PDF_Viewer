import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from './Footer';

const HomePage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);

  // Function to fetch PDF files from the database
  const fetchPdfFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pdf/get', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
      setPdfFiles(response.data);
    } catch (error) {
      console.error('Error fetching PDF files:', error);
    }
  };

  useEffect(() => {
    fetchPdfFiles();
  }, []);

  const handleFileUpload = async (event) => {

    const files = Array.from(event.target.files);

    // Validate each file to ensure it is a PDF
    const validFiles = files.filter(file => file.type === 'application/pdf');

    if (validFiles.length !== files.length) {
      alert('Please select only PDF files.');
      return;
    }

    // Proceed with file upload
    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append('pdf', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/pdf/upload', formData, {
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'File uploaded successfully!',
        showConfirmButton: false,
        timer: 1000
      })
      fetchPdfFiles(); // Refresh the list after uploading
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };



  return (
    <>
    {localStorage.getItem('token') ? (
      <>
      <h1>PDF Uploader</h1>
      <input type="file" accept=".pdf" onChange={handleFileUpload} multiple />
      <h1>Uploaded PDF Files</h1>
      <div style={styles.grid}>
        {pdfFiles.map((pdf, index) => (
          <div key={index} style={styles.gridItem}>
            <Link to={`/view-pdf/${pdf._id}`} state={{ pdfFiles }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt={`PDF ${index + 1}`} style={styles.thumbnail} />
              <p>PDF {index + 1}</p>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
      </>
    ):(
      <>
      <h1>Welcome to Our Site</h1>
      <p>Please log in to continue...</p>
      </>
    )}
    </>

  );
};

const styles = {
  container: {
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    width: '100%',
  },
  gridItem: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '100px',
    height: '100px',
  },
};

export default HomePage;
