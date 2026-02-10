# 🚀 HR Management SaaS Platform

A production-style **HR Management SaaS** built to manage employees, attendance, leaves, announcements, and departments with **real-world workflows, strict validations, and real-time notifications**.

This platform follows a **Company → HR → Employee** hierarchy and is designed to simulate how modern HR systems work in real organizations.

---

## 🌟 Highlights

- ✅ Secure HR & employee onboarding
- 🔔 Real-time notifications using WebSockets
- ⏱ Smart attendance system with validations
- 🤖 Cron-based automation (auto absent marking)
- 🌗 Modern UI with dark mode & shimmer loaders
- 🔐 Role-based access & JWT authentication

---

## 🧠 Application Flow

### 🏢 Company & HR Setup
- HR signs up and creates their **company**
- HR acts as the **company admin**
- All employees, departments, and data belong to the company

---

### 👥 Employee Onboarding (Token-Based)
- HR adds employees one by one
- A **secure invite URL** is generated for each employee
- URL contains a **token-based verification**
- HR shares the URL with the employee
- Employee:
  - Opens the link
  - Sets their password
  - Logs in securely

✔ Employees cannot sign up directly  
✔ Fully controlled onboarding by HR  

---

## ⏱ Attendance Management

### 👨‍💼 Employee Side
- Check-In / Check-Out system
- Attendance status:
  - Present
  - Absent
  - Half-Day
- Monthly attendance view
- Daily working hours calculation

### 👩‍💼 HR Side
- View daily attendance of all employees
- View employee-wise & monthly attendance
- Track check-in / check-out timings

---

### ⏰ Smart Attendance Rules
- Late check-in validation (after **11:00 AM**)
- If an employee **does not check in**, a **cron job automatically marks them absent**
- Duplicate and invalid attendance entries are prevented

---

## 📅 Leave Management
- Employees can apply for leaves
- HR can:
  - ✅ Approve leaves
  - ❌ Reject leaves
- Leave status updates in real time

---

## 📢 Announcements & Policies
- HR can create company-wide announcements
- Employees can view announcements instantly
- Policies can be published and updated centrally

---

## 🔔 Real-Time Notifications (WebSockets)
Live notifications using **WebSockets (Socket.IO)** for:
- New announcements
- Leave approval / rejection
- Important HR updates

⚡ No page refresh required

---

## 🏗 Department Management
- HR can create departments
- Departments can be:
  - Enabled
  - Disabled
- Employees can be associated with departments

---

## 🔐 Account & Security
- HR and employees can change their passwords
- HR can:
  - Enable / disable employees
  - Control access
- Secure authentication using **JWT**
- Token-based employee verification

---

## 🎨 UI & UX
- Modern SaaS dashboard
- Fully responsive design
- Dark / Light mode
- Premium shimmer (skeleton loaders)
- Clean & intuitive layouts

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios
- WebSockets (Socket.IO Client)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- WebSockets (Socket.IO)
- Cron Jobs

---

## 📂 Project Structure

