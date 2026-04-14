# COMP3133 Assignment 2 – Angular Frontend (GraphQL Employee Management)
Gia Nagpal - 101508691
## 📌 Overview

This project is a full-stack Employee Management System frontend built using **Angular**. It integrates with a GraphQL backend (Assignment 1) to perform authentication and complete CRUD operations on employee data.

The application demonstrates modern frontend development practices including routing, form validation, state management, and API integration using GraphQL.

---

## 🚀 Features

### 🔐 Authentication

* User Signup with validation
* User Login with JWT token
* Session persistence using LocalStorage
* Protected routes using Auth Guards
* Logout functionality

---

### 👨‍💼 Employee Management (CRUD)

#### ✅ View Employees

* Displays all employees in a responsive table
* Includes profile picture and full details

#### ➕ Add Employee

* Form with validation
* Upload profile picture
* Stores data via GraphQL mutation

#### 🔍 View Employee Details

* Dedicated page for each employee
* Displays all employee information

#### ✏️ Edit Employee

* Pre-filled form with existing data
* Update employee information
* Supports optional image update

#### ❌ Delete Employee

* Delete button with confirmation
* Updates list dynamically

---

### 🔎 Search Functionality

* Search employees by:

  * Department
  * Designation
* Reset button clears search and reloads data

---

### 🎨 UI/UX

* Built with Bootstrap
* Responsive design
* Clean and user-friendly interface
* Action icons for View, Edit, Delete

---

## 🛠️ Technologies Used

* Angular (Standalone Components)
* TypeScript
* GraphQL
* HttpClient
* Bootstrap & Bootstrap Icons
* RxJS

---

## 📁 Project Structure

```
src/
│
├── app/
│   ├── guards/
│   │   └── auth-guard.ts
│   │
│   ├── pages/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── employee-list/
│   │   ├── employee-add/
│   │   ├── employee-detail/
│   │   └── employee-edit/
│   │
│   ├── services/
│   │   └── auth.service.ts
│   │
│   ├── app.routes.ts
│   └── app.config.ts
│
└── main.ts
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd studentID_comp3133_assignment2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Application

```bash
ng serve
```

Visit:

```
http://localhost:4200
```

---

## 🔗 Backend Requirement

This frontend requires the backend from **Assignment 1** running on:

```
http://localhost:4000/graphql
```

Make sure backend is running before using the frontend.

---

## 🔐 Validation

### User Validation

* Username required
* Email must be valid format
* Password minimum 6 characters

### Employee Validation

* First & Last Name required
* Valid email format
* Salary ≥ 1000
* Valid gender selection
* Department required
* Date of joining required
* Profile picture required (Add)

---

## 📡 GraphQL Integration

All operations are performed using GraphQL:

* Queries:

  * Get All Employees
  * Get Employee By ID
  * Search Employees

* Mutations:

  * Add Employee
  * Update Employee
  * Delete Employee
  * Signup
  * Login

---

## 🔒 Security

* JWT-based authentication
* Protected routes using Auth Guards
* Token stored securely in LocalStorage


---

## ☁️ Deployment

Frontend is deployed Vercel: 

Backend is deployed Render:

---

## 📸 Screenshots



---

## 📚 Course Information

Course: COMP3133
Program: Computer Programming and Analysis
Institution: George Brown College

---

## 👨‍💻 Author

**Gia Nagpal**

---

## ✅ Conclusion

This project successfully demonstrates:

* Angular frontend development
* GraphQL API integration
* Full CRUD operations
* Form validation and authentication
* Clean UI/UX design

---
