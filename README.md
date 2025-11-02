# 🏫 Hostel and Mess Management System

The **Hostel and Mess Management System** is a full-stack web application designed to digitize and automate the hostel and mess management processes in educational institutions. It helps manage student profiles, hostel allocation, attendance, fees, meal planning, billing, and complaint tracking through role-based portals for students and administrators.

---

## 🚀 Quick Start

**Want to run this locally?** Check out the detailed [SETUP.md](./SETUP.md) guide for step-by-step instructions.

### Option 1: Single Command (Recommended) ⭐

From the project root directory:

```bash
# Install all dependencies (first time only)
npm install
npm run install:all

# Start both backend and frontend
npm run dev
```

### Option 2: Separate Terminals

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd hostel-mess-frontend
npm install
npm start
```

**Prerequisites:** Node.js (v16+), MongoDB (v4.4+), and npm installed.

---

## 🔧 Features

### 🧑‍🎓 Student Portal

- ✅ Secure student registration and login
- 🏠 View hostel room details and personal profile
- 📆 Mark and monitor daily mess attendance
- 💳 View detailed monthly mess bill and fee status
- 🛠️ Submit hostel-related complaints and feedback
- 📊 Dashboard with summary widgets for fees, attendance, and mess balance

### 🧑‍💼 Admin Portal

- 🗂️ Manage student records (Add/Update/Delete)
- 🛏️ Allocate and manage hostel rooms
- 📈 Monitor attendance with approval-based leave system
- 🧾 Track fee collection and send payment reminders
- 🍽️ Manage mess menu, consumption logs, and billing
- 📬 Review and resolve student complaints
- 📊 Admin dashboard with analytics, trends, and hostel stats

---

## 💻 Frontend Details

- **Framework**: React.js (v19.1.0)
- **UI Library**: Material-UI (MUI v7.0.2)
- **Routing**: React Router DOM (v7.5.3)
- **State Management**: React Context API + Redux Toolkit
- **Charts**: Recharts (v2.15.3) for data visualization
- **Theme**: NIT Jalandhar Official Blue & White Theme
- **Features**:
  - Responsive design (mobile, tablet, desktop)
  - Secure role-based authentication (Student/Admin)
  - NITJ official color scheme and branding
  - Professional institutional layout
  - Real-time dashboard with charts and statistics
  - Form validation with Yup and Formik
  - Notification system
  - Date pickers for scheduling

---

## 🖥️ Backend Details

- **Platform**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB (NoSQL)
- **ODM**: Mongoose (v8.14.1)
- **Authentication**: JWT-based login system
- **Security**:
  - Password hashing with Bcrypt.js
  - Input validation via Express Validator
  - HTTP protection with Helmet
  - Rate limiting and XSS protection
  - MongoDB injection prevention
  - CORS configuration
- **API Architecture**:
  - `POST /api/login` - User authentication
  - `POST /api/register` - User registration
  - `GET /api/students/me` - Get student profile
  - `GET /api/attendance` - Attendance records
  - `GET /api/fees` - Fee information
  - `GET /api/complaints` - Complaints list
  - `POST /api/complaints` - Submit complaint
  - `GET /api/mess/menu` - Mess menu
  - `GET /api/mess/billing` - Mess billing
  - `GET /api/health` - Server health check

---

## 👨‍💻 Developed By

**Minor Project Team – B.Tech, Instrumentation and Control Engineering**  
**Dr. B R Ambedkar National Institute of Technology, Jalandhar**

- [Raushan Jha](https://github.com/Raushanjha4754)
- [Monib Singha](https://github.com/Monib007)
- [Bhaskar Kumar](https://github.com/Dhairya250974)
- [Akhilesh Chauhan](https://github.com/Akhilesh278)

---

## 🧑‍🏫 Guided By

**Dr. Dilbag Singh**  
_Professor_  
Department of Instrumentation and Control Engineering  
National Institute of Technology, Jalandhar

**Ashutosh Anand**  
 _Senior Software Developer_ <br> Paytm

---

## 🎨 Design & Theme

- **Color Scheme**: NIT Jalandhar Official Blue (#003366) and White
- **Typography**: Roboto (Professional institutional font)
- **Layout**: Modern, clean interface matching NITJ website design
- **Responsive**: Fully responsive across all device sizes
- **Accessibility**: WCAG compliant with focus indicators and semantic HTML

---

## 📦 Project Structure

```
MinorProject/
├── server/                    # Backend (Node.js + Express)
│   ├── config/               # Configuration files
│   ├── controllers/          # Route controllers
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Utility functions
│   └── server.js             # Main server file
│
├── hostel-mess-frontend/     # Frontend (React)
│   ├── src/
│   │   ├── admin/            # Admin components
│   │   ├── auth/             # Authentication
│   │   ├── components/       # Reusable components
│   │   ├── features/         # Feature modules
│   │   ├── layouts/          # Layout components
│   │   └── theme/            # NITJ theme configuration
│   └── public/               # Static assets
│
├── package.json              # Root scripts (run both servers)
├── SETUP.md                  # Detailed setup guide
└── README.md                 # This file
```

---

## 🛠️ Available Scripts

From the **project root**:

| Command | Description |
|---------|-------------|
| `npm install` | Install root dependencies (concurrently) |
| `npm run install:all` | Install all dependencies (backend + frontend) |
| `npm run dev` | **Start both backend and frontend** |
| `npm run dev:server` | Start only backend |
| `npm run dev:client` | Start only frontend |
| `npm run seed` | Seed database with sample data |

---

## 📈 Future Enhancements

- 📱 Mobile App (React Native / Flutter)
- 🔔 Real-time notifications with WebSockets/Firebase
- 🤖 Facial recognition-based attendance using OpenCV/DeepFace
- 📊 AI-powered analytics and report generation
- 🧾 Auto-generated receipts and downloadable fee summaries
- 📦 Docker + Kubernetes for scalable deployment
- 🌙 Dark mode toggle
- 📧 Email notifications

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup and installation guide
- **Theme Configuration** - `hostel-mess-frontend/src/theme/theme.js`
- **API Documentation** - Check individual route files in `server/routes/`

---

## 🎯 Key Features Summary

### Student Portal
✅ Dashboard with statistics and charts  
✅ Fee payment tracking  
✅ Attendance monitoring  
✅ Mess menu viewing  
✅ Mess billing and balance  
✅ Complaint submission and tracking  

### Admin Portal
✅ Student management (CRUD operations)  
✅ Attendance management and approval  
✅ Fee collection tracking  
✅ Mess menu and billing management  
✅ Complaint resolution system  
✅ Analytics dashboard with charts  

---

> 🚀 This project was developed as part of the Minor Project requirement for the 6th Semester at NIT Jalandhar, aimed at solving real-world hostel management inefficiencies through technology. The design follows NIT Jalandhar's official branding guidelines.
