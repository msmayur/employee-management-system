#  Employee Management System (EMS SaaS)

A modern full-stack **Employee Management System** built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.
This application allows organizations to manage employees efficiently with a clean SaaS-style UI and secure authentication.

---

##  Features

###  Authentication

* JWT-based authentication
* Secure login & registration
* Password hashing using bcrypt
* Cookie-based session management
* Route protection (only logged-in users can access protected pages)

---

###  Employee Management

* Add Employee
* Edit Employee (modal-based UI)
* Soft Delete (mark as deleted)
* Restore deleted employees
* View all employees in a structured table

---

### Search & Filters

* Search employees by name/email
* Filter by department and status
* Reset filters and search cleanly
* Controlled inputs for smooth UX

---

### 🏢 Organization Management

* Create organizations
* Assign employees to organizations
* View organization details

---

### Soft Delete System

* Employees are not permanently deleted
* Separate page for deleted employees
* Restore functionality

---

### UI/UX (SaaS Style)

* Built with **shadcn/ui + Tailwind CSS**
* Clean dashboard layout
* Section-based UI:

  * Add Employee
  * Filters & Search
  * Employee Table
* Gradient background + glow effects
* Responsive design
* Loading & empty states

---

### Database Seeding

* Preloaded demo data for testing:

  * User
  * Organizations
  * Employees

---

## Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/ui
* **Backend:** Next.js API Routes
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Auth:** JWT + Cookies
* **Validation:** Zod + React Hook Form
* **Notifications:** Sonner

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/msmayur/employee-management-system.git
cd employee-management-system
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

### 4. Run Migrations

```bash
npx prisma migrate dev
```

---

### 5. Seed Database

```bash
npx prisma db seed
```

---

### Demo Credentials

```txt
Email: admin@test.com
Password: 123456
```

---

### 6. Run Development Server

```bash
npm run dev
```

---

## 🔒 Protected Routes

* `/employees`
* `/organizations`
* `/employees/deleted`

Only accessible after login.

---

## 📁 Project Structure

```
app/
 ├── (auth)
 │    ├── login
 │    ├── register
 │
 ├── (protected)
 │    ├── employees
 │    ├── organizations
 │
 ├── api/
 ├── components/
 ├── lib/
```

---

## 🚀 Key Highlights

* Clean SaaS dashboard UI
* Fully functional CRUD system
* Secure authentication system
* Production-level form handling
* Proper state management
* Database seeding for quick testing

---

## 📌 Future Improvements

* Role-based access control
* Pagination optimization
* Dashboard analytics
* Deployment (Vercel + Supabase)

---

## 👨‍💻 Author

M S Mayur
