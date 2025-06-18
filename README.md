# DevifyX Auth Avatar App Assignment

Custom Avatar Upload API

---

## ✨ Features

-  JWT-based authentication (Login & Signup)
-  Avatar upload, change, and delete (Cloudinary)
-  Protected user profile page
-  Admin page to view all users and avatars

---

## 📁 Project Structure

```
root/
├── client/              # React frontend (Vite)
│   └── src/pages/
│       ├── AuthPage.jsx
│       ├── HomePage.jsx
│       └── AdminPage.jsx
├── server/              # Node.js + Express backend
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   └── index.js
│   └── .env

└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Getting Started

### 📦 Backend

```bash
cd server
npm install
npm run dev
```

Runs the backend on: `http://localhost:5000`

---

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

Runs the React app on: `http://localhost:5173`

---

## 🔑 API Routes

### Auth

- `POST /api/auth/signup` – Register a user
- `POST /api/auth/login` – Login
- `GET /api/auth/me` – Get current user info (token required)

### Avatar

- `POST /api/avatar/upload` – Upload/change avatar
- `DELETE /api/avatar/delete` – Delete avatar

### Admin

- `GET /api/admin/users` – Get all users (token required)

---

## 🖼️ UI Screens

- `/auth` – Login / Signup page
- `/` – Home (protected user profile)
- `/admin` – Admin view of all users and avatars

---

## 🛠️ Built With

- **TechStack**: Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary , React


---

---

## 📄 License

MIT

---


