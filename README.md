# 📸 PicNote – Image Sharing Platform

PicNote is a full-stack image-sharing web application that allows users to upload, manage, and share their images. Users can securely authenticate, upload images with descriptions, and manage their own image collections through a simple and responsive interface.

## ✨ Features

- **User Authentication** – Secure user registration and login using JWT authentication.
- **Password Encryption** – Passwords are securely hashed using bcrypt.
- **Image Upload** – Upload images with descriptions.
- **Image Management** – Create, view, update, and delete uploaded images.
- **Cloud Image Storage** – Store and manage images using Cloudinary.
- **Protected Routes** – Restrict access to authenticated users.
- **Cookie-Based Authentication** – Manage authentication tokens using HTTP-only cookies.
- **Responsive UI** – User-friendly interface for different screen sizes.
- **Notifications** – Display success and error messages using React Toastify.

## 🛠️ Tech Stack

### Frontend
- React.js 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js 5
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Multer
- Cloudinary
- Cookie Parser
- CORS
- Morgan

## 📂 Project Structure

```text
PicNote/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run PicNote locally.

### 1. Clone the Repository

```bash
git clone https://github.com/merupeshpradhan/PicNote.git
```

```bash
cd PicNote
```

### 2. Setup the Backend

Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the Backend directory and configure your environment variables:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CORS_ORIGIN=http://localhost:5173
```

Make sure the environment variable names match those used in your backend configuration.

Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd PicNote/Frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Open the Application

Visit the following URL in your browser:

```text
http://localhost:5173
```

## 🔐 Environment Configuration

Before running the application, configure:

- **MongoDB:** Set up a MongoDB database and add its connection string.
- **Cloudinary:** Create an account and configure your cloud name, API key, and API secret.
- **JWT:** Generate secure secrets for access and refresh token authentication.
- **CORS:** Configure the frontend origin in the backend.

**Note:** Never commit your `.env` file or expose your API credentials publicly.

## 🎯 Project Goals

The main goal of PicNote is to build a practical full-stack application while improving my understanding of:

- Full-stack web application development.
- REST API development and integration.
- Authentication and authorization.
- Image uploading and cloud storage.
- Database management with MongoDB.
- Frontend and backend integration.
- Responsive UI development.

## 👨‍💻 Developer

**Rupesh Pradhan**

Full Stack Developer | MERN Stack

- GitHub: [@merupeshpradhan](https://github.com/merupeshpradhan)
- LinkedIn: [Rupesh Pradhan](https://linkedin.com/in/merupeshpradhan)

---

⭐ If you find this project interesting, consider giving it a star!

**Thank you for visiting PicNote! 💙**
