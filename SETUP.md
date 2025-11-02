# 🚀 Local Development Setup Guide

This guide will help you set up and run the Hostel Mess Management System locally on your machine.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
  - Or use **MongoDB Atlas** (Cloud MongoDB) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

---

## 🔧 Setup Steps

### Step 1: Clone the Repository (if not already done)

```bash
git clone <repository-url>
cd MinorProject
```

### Step 2: MongoDB Setup

Choose one of the following options:

#### Option A: Local MongoDB Installation

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:

   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Verify MongoDB is running:
   ```bash
   mongosh
   ```
   If you see the MongoDB shell, you're good to go!

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)

1. Sign up for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (choose the free tier)
3. Create a database user with username and password
4. Whitelist your IP address (or `0.0.0.0/0` for development)
5. Copy your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Step 3: Backend Server Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:
   Create a `.env` file in the `server` directory with the following content:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   # For Local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/hostel-mess-management

   # OR for MongoDB Atlas (replace with your connection string):
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-mess-management

   # JWT Secret Key (change this to a secure random string in production)
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=90d
   ```

4. Seed the database (optional - creates sample data):

   ```bash
   npm run seed
   ```

5. Start the backend server:

   ```bash
   # Development mode (with auto-reload):
   npm run dev

   # OR Production mode:
   npm start
   ```

   You should see:

   ```
   ============================================================
   🚀 Hostel Mess Management System Server
   ============================================================
   📍 Environment: development
   🌐 Server running on: http://localhost:5000
   📊 API Health Check: http://localhost:5000/api/health
   ============================================================
   ```

   ✅ **Backend is now running on `http://localhost:5000`**

---

### Step 4: Frontend Setup

1. Open a **new terminal window** (keep backend running)

2. Navigate to the frontend directory:

   ```bash
   cd hostel-mess-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the React development server:

   ```bash
   npm start
   ```

   The browser should automatically open to `http://localhost:3000`

   ✅ **Frontend is now running on `http://localhost:3000`**

---

## 🎯 Quick Start (All at Once)

You have **three options** to run both backend and frontend:

### Option 1: Using Root Package.json (Recommended) ⭐

This is the easiest way - run both in a single terminal:

```bash
# From the project root directory
npm install
npm run dev
```

This will start both:

- ✅ Backend server on `http://localhost:5000`
- ✅ Frontend app on `http://localhost:3000`

**First time setup:**

```bash
# Install all dependencies (backend + frontend + concurrently)
npm run install:all

# Then start both
npm run dev
```

### Option 2: Separate Terminals (Traditional Method)

Use two terminal windows:

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend (in a new terminal)
cd hostel-mess-frontend
npm install
npm start
```

### Option 3: Using npm-run-all or concurrently Manually

If you prefer more control:

```bash
# Install concurrently globally (optional)
npm install -g concurrently

# From project root
concurrently "npm run dev --prefix server" "npm start --prefix hostel-mess-frontend"
```

---

## 📦 Root Package.json Scripts

After running `npm install` in the root directory, you can use these commands:

| Command               | Description                                       |
| --------------------- | ------------------------------------------------- |
| `npm run install:all` | Install dependencies for both server and frontend |
| `npm run dev`         | **Start both backend and frontend in dev mode**   |
| `npm run dev:server`  | Start only backend server                         |
| `npm run dev:client`  | Start only frontend                               |
| `npm start`           | Start both in production mode                     |
| `npm run seed`        | Seed the database with sample data                |

---

## 🔐 Default Login Credentials

After running the seed script, you can use these credentials:

### Student Login:

- **Roll Number**: `12345678`
- **Password**: `password123` (or check seed.js for actual password)

### Admin Login:

- **Employee ID**: `87654321`
- **Password**: `admin123` (or check seed.js for actual password)

> ⚠️ **Note**: These are default credentials. Change them in production!

---

## 📁 Project Structure

```
MinorProject/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables (create this)
│   └── server.js           # Main server file
│
└── hostel-mess-frontend/  # Frontend (React)
    ├── src/
    │   ├── admin/          # Admin components
    │   ├── auth/           # Authentication components
    │   ├── components/     # Reusable components
    │   ├── features/       # Feature-specific components
    │   ├── layouts/        # Layout components
    │   └── App.jsx         # Main app component
    └── public/             # Static files
```

---

## 🌐 API Endpoints

The backend server provides these API endpoints:

- `GET /api/health` - Health check
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/students` - Get student data
- `GET /api/attendance` - Get attendance data
- `GET /api/fees` - Get fee information
- `GET /api/complaints` - Get complaints
- `GET /api/mess` - Get mess menu and billing

See individual route files for complete API documentation.

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: MongoDB connection error

- **Solution**: Make sure MongoDB is running locally, or check your MongoDB Atlas connection string in `.env`

**Problem**: Port 5000 already in use

- **Solution**: Change `PORT=5000` to another port (e.g., `5001`) in `.env`, or stop the application using port 5000

**Problem**: `npm install` fails

- **Solution**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Frontend Issues

**Problem**: Port 3000 already in use

- **Solution**: React will prompt you to use a different port (like 3001). Press `Y` to accept.

**Problem**: CORS errors

- **Solution**: Make sure backend is running and CORS is configured in `server/server.js`

**Problem**: API calls failing

- **Solution**:
  - Check backend is running on port 5000
  - Check API base URL in frontend API files
  - Check browser console for specific error messages

### Database Issues

**Problem**: Seed script fails

- **Solution**:
  - Make sure MongoDB is running
  - Check `.env` file has correct `MONGODB_URI`
  - Drop the database and try again: `mongosh -> use hostel-mess-management -> db.dropDatabase()`

---

## 📝 Environment Variables Reference

### Backend (.env in `server/` directory)

| Variable         | Description               | Default                                            |
| ---------------- | ------------------------- | -------------------------------------------------- |
| `PORT`           | Server port number        | `5000`                                             |
| `NODE_ENV`       | Environment mode          | `development`                                      |
| `MONGODB_URI`    | MongoDB connection string | `mongodb://localhost:27017/hostel-mess-management` |
| `JWT_SECRET`     | Secret key for JWT tokens | `your-secret-key-here`                             |
| `JWT_EXPIRES_IN` | JWT token expiration      | `90d`                                              |

---

## 🎨 Development Tips

1. **Use Hot Reload**: Both frontend and backend support hot reloading

   - Backend: `npm run dev` (uses nodemon)
   - Frontend: `npm start` (React hot reload)

2. **Check Logs**:

   - Backend logs appear in the terminal where you ran `npm run dev`
   - Frontend logs appear in the browser console

3. **Database Management**:

   - Use MongoDB Compass (GUI) for visual database management
   - Or use `mongosh` for command-line database access

4. **API Testing**:
   - Use Postman or Thunder Client (VS Code extension)
   - Or test via the frontend directly

---

## ✅ Verification Checklist

Before starting development, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] MongoDB is installed and running (`mongosh`)
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Frontend dependencies installed (`cd hostel-mess-frontend && npm install`)
- [ ] `.env` file created in `server/` directory
- [ ] Backend server starts without errors (`npm run dev`)
- [ ] Frontend starts without errors (`npm start`)
- [ ] Can access `http://localhost:3000` in browser
- [ ] Can access `http://localhost:5000/api/health` in browser

---

## 🚀 Next Steps

Once everything is running:

1. Visit `http://localhost:3000` in your browser
2. Login with default credentials (see above)
3. Explore the student and admin portals
4. Check the README.md for feature documentation

---

## 📞 Need Help?

- Check the console/terminal for error messages
- Review the code comments (we've added comprehensive documentation!)
- Check MongoDB logs if database issues occur
- Verify all environment variables are set correctly

---

**Happy Coding! 🎉**
