# Noor Automobiles - By MM

**Japanese Car Importer | New & Used Cars**

A luxury elegant website with black, white, and red theme for Noor Automobiles showroom in Hyderabad.

---

## 🚗 Business Information

- **Business Name:** Noor Automobiles - By MM
- **Services:** Japanese Car Importer | New & Used Cars
- **Location:** Honda Palace, Opp. Taj Pump, Jamshoro Road, Hyderabad

### Contact

| Name | Phone |
|------|-------|
| Muneeb Noor | 0324-1344368 |
| Moiz Noor | 0320-1377167 |

**Email:** noorautomobiles90@gmail.com

---

## 🎨 Design Theme

- **Style:** Luxury Elegant with smooth animations and serif fonts
- **Colors:** Black (#0a0a0a), White (#ffffff), Red accent (#c41e3a)
- **Vibe:** Friendly and Approachable

---

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- SQLite (better-sqlite3)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18 + Vite
- React Router DOM
- Axios for API calls
- Lucide React icons

---

## 📂 Project Structure

```
noor-automobile/
├── backend/
│   ├── config/
│   │   └── database.js       # SQLite setup & seed data
│   ├── middleware/
│   │   └── auth.js           # JWT authentication
│   ├── routes/
│   │   ├── auth.js           # Login/Register endpoints
│   │   ├── cars.js           # Car CRUD operations
│   │   └── inquiries.js      # Contact form submissions
│   ├── server.js             # Express server
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   └── CarCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Collection.jsx
    │   │   ├── CarDetail.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── styles/
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Extract and navigate to the project:**
```bash
unzip noor-automobile-complete.zip
cd noor-automobile
```

2. **Install and run Backend:**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

3. **Install and run Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

---

## 🔐 Admin Access

**Email:** noorautomobiles90@gmail.com  
**Password:** admin123

Admin features:
- Add/Edit/Delete cars
- View and manage customer inquiries
- Dashboard with statistics

---

## 📱 Features

### Public Pages
- ✅ Home page with hero, features, and featured cars
- ✅ Collection page with search and filters
- ✅ Car detail page with full specs (Contact for Details - no pricing)
- ✅ About page with company story
- ✅ Contact page with form and direct phone numbers

### Admin Dashboard
- ✅ Add new cars with all details
- ✅ Edit/Update existing cars
- ✅ Delete cars
- ✅ View customer inquiries
- ✅ Update inquiry status (pending/contacted/closed)
- ✅ Dashboard statistics

### User Features
- ✅ User registration and login
- ✅ Send inquiries for specific cars
- ✅ General contact form

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Add car (admin)
- `PUT /api/cars/:id` - Update car (admin)
- `DELETE /api/cars/:id` - Delete car (admin)

### Inquiries
- `POST /api/inquiries` - Submit inquiry
- `GET /api/inquiries` - Get all inquiries (admin)
- `PUT /api/inquiries/:id` - Update status (admin)

---

## 📄 License

© 2024 Noor Automobiles. All rights reserved.

---

**Made with ❤️ for Noor Automobiles, Hyderabad**
