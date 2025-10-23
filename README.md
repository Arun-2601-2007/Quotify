🌟 Quotify

Quotify is a full-stack web application that lets users explore, search, and manage inspiring quotes from various authors.
Built with Node.js, Express, MongoDB, EJS, and Cloudinary.

📖 Table of Contents
  Project Overview
  Features
  Tech Stack
  Folder Structure
  Installation
  Environment Variables
  Usage
  API Routes
  Contributing
  License
  Acknowledgements

🚀 Project Overview
  Quotify allows users to:
    Discover and view random quotes.
    Search for quotes by author.
    Add quotes and Upload images for quotes via Cloudinary.

This app is built using Express.js for routing, MongoDB Atlas for database management, and EJS templates for rendering views dynamically.

✨ Features
  🔐 User Authentication (Login, Signup, Logout)
  📜 Browse all quotes or random quotes
  ✍️ Search by author name
  🌤️ Upload and display quote images (Cloudinary)
  💬 Flash messages for success/error feedback
  📱 Fully responsive layout (Bootstrap + custom CSS)
  ⚙️ CRUD operations for managing quotes and reviews

🧠 Tech Stack
  Backend	- Node.js, Express.js
  Frontend - EJS, HTML, CSS, JavaScript
  Database - MongoDB Atlas (Mongoose)
  Authentication - Passport.js (Local Strategy)
  Session Management - express-session, connect-mongo
  Image Uploads	- Cloudinary
  Utilities	dotenv, connect-flash
  
🗂️ Folder Structure
Quotify/
│
├── CONTROLLERS/ # Controllers for handling route logic
├── INIT/ # Initialization scripts
├── MODELS/ # Mongoose schemas (User, Quote, etc.)
├── PUBLIC/ # Static files (CSS, JS, images)
│ └── IMAGES/
├── ROUTES/ # Express routes (auth, quotes, etc.)
├── UTILS/ # Utility functions
├── VIEWS/ # EJS templates (layouts, partials, pages)
├── cloudConfig.js # Cloudinary configuration
├── app.js # Main application file
├── package.json # Project metadata and dependencies
└── .env # Environment variables (not committed)

⚙️ Installation
  1. Clone the Repository - git clone https://github.com/Arun-2601-2007/Quotify.git
  2. cd Quotify
  3. Install Dependencies - npm install
  4. Set Up Environment Variables
  5. Create a .env file in the root folder.
  6. Start the Application - npm start
  7. Open your browser and navigate to
    👉 http://localhost:8080

🔑 Environment Variables
  Your .env file should include:
  PORT=8080
  ATLASDB_URL=your_mongodb_connection_string
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  SESSION_SECRET=your_session_secret
⚙️ To initialize the database with sample data:
  1. Go to the INIT folder
  2. Run - node index.js

💻 Usage
  Once the server is running:
  Visit the homepage to explore quotes.
  Use the “Get Author Quotes” form to search by author.
  Use the “Add Quote” page (if enabled) to contribute your own.
  Login or register.

🌐 API Routes
  Method	Endpoint	Description
  GET	/api/quotes	Fetch all quotes
  GET	/api/quotes/random	Get a random quote
  GET	/api/quotes/author/:authorName	Get quotes by specific author
  POST	/api/signup	Register new user
  POST	/api/login	Login user
  GET	/api/logout	Logout current user

📄 License
  This project is licensed under the MIT License.
  See the LICENSE file for details.

⭐ If you like this project, consider giving it a star on GitHub!
