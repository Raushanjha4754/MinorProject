# 🏫 Hostel and Mess Management System

The **Hostel and Mess Management System** is a full-stack web application designed to digitize and automate the hostel and mess management processes in educational institutions. It helps manage student profiles, hostel allocation, attendance, fees, meal planning, billing, and complaint tracking through role-based portals for students and administrators.

---

## 🚀 Quick Start

**Want to run this locally?** Check out the detailed [SETUP.md](./SETUP.md) guide for step-by-step instructions.

**TL;DR Quick Start:**

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

**Prerequisites:** Node.js, MongoDB, and npm installed.

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

- **Framework**: React.js
- **Routing**: React Router DOM
- **UI/UX**: Custom dashboard with sidebar navigation
- **Charts**: Bar and pie charts for attendance and fee stats
- **Features**:
  - Responsive design (accessible via mobile and desktop)
  - Secure role-based login (Student/Admin)
  - Dynamic content updates with API integration
  - Form validation and notification system
  - Dark mode toggle (for admin)

---

## 🖥️ Backend Details

- **Platform**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (NoSQL)
- **ODM**: Mongoose
- **Authentication**: JWT-based login system
- **Security**:
  - Password hashing with Bcrypt.js
  - Input validation via Express Validator
  - HTTP protection with Helmet
  - Rate limiting and XSS protection
- **API Architecture**:
  - `/api/auth` - Login & Registration
  - `/api/students` - Student profile & records
  - `/api/attendance` - Attendance tracking
  - `/api/fees` - Fee and billing management
  - `/api/complaints` - Complaint system
  - `/api/mess` - Mess menu and billing

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

## 📈 Future Enhancements

- 📱 Mobile App (React Native / Flutter)
- 🔔 Real-time notifications with WebSockets/Firebase
- 🤖 Facial recognition-based attendance using OpenCV/DeepFace
- 📊 AI-powered analytics and report generation
- 🧾 Auto-generated receipts and downloadable fee summaries
- 📦 Docker + Kubernetes for scalable deployment

---

> 🚀 This project was developed as part of the Minor Project requirement for the 6th Semester at NIT Jalandhar, aimed at solving real-world hostel management inefficiencies through technology.
