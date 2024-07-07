# MERN Stack PDF Upload and Viewer Application

## Overview

This repository contains a MERN stack application designed to allow users to upload and view PDF files. The application includes basic logging functionality and consists of two primary pages: the Home page and the PDF Viewer page. The interface is designed to be user-friendly and follows modern UI design trends. Additionally, the application implements user authentication and incorporates data tracing and security methods to ensure data protection.

## Features

- **User Authentication**: Secure user authentication on both the frontend and backend to ensure that only authorized users can upload and view PDFs.
- **PDF Upload API**: An API endpoint for users to upload PDF files, which are then stored securely on the server.
- **PDF Viewer**: A dedicated page for viewing uploaded PDFs directly within the application.
- **Logging**: Backend logging of all API requests for monitoring and debugging purposes.
- **Data Security**: Implementation of data tracing and security methods to protect user data and uploaded files.

## Pages

1. **Home**: The landing page where users can log in, register, and upload PDF files.
2. **PDF Viewer**: A page that displays the uploaded PDF files and allows users to view them directly within the application.



## Technologies Used

- **Frontend**: React.js with modern UI design trends
- **Backend**: Node.js with Express.js
- **Database**: MongoDB for storing user data and file metadata
- **Authentication**: JWT-based authentication
- **File Storage**: Multer for storing PDF files
- **PDF Viewing**: React-pdf-viewer for rendering PDFs in the browser

## Getting Started


### Prerequisites

- Node.js
- MongoDB
  

### Installation

1. Clone the repository:
```bash
git clone <git url>
```


2. Navigate into the project directory:
```bash
cd frontend // for frontend
cd backend  // for backend
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```
### Set Up environment Variables

- Please create a .env file with neccesary variables mentioned in .env example file


### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend server:
```bash
cd ../frontend
npm run dev
```

### Usage
- Open your browser and visit `http://localhost:5173` to view the application.

### Routes

- `/`: Home page.
- `/view-pdf/:id`: View the selected PDF file's content.
- `/signUp`: Sign up for an account.
- `/signIn`: Sign in to your account.
