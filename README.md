# 🔍 Lost & Found Management System

A web-based application designed to help users report, search, and recover lost items efficiently. This system provides a simple and user-friendly interface for managing lost and found records.

---

## 🚀 Features

* 👤 User Registration & Login (Authentication)
* 📦 Report Lost Items
* 🔍 Report Found Items
* 📋 View All Listings
* 🛠️ Admin Panel for Management
* 📸 Image Upload Support
* 🌙 Clean UI (with Dark/Light mode if implemented)

---

## 🛠️ Technologies Used

| Technology  | Purpose          |
| ----------- | ---------------- |
| Node.js     | Backend runtime  |
| Express.js  | Server framework |
| MongoDB     | Database         |
| Mongoose    | ODM              |
| HTML/CSS/JS | Frontend         |
| Multer      | File uploads     |
| JWT         | Authentication   |

---

## 📂 Project Structure

lost-and-found-system/
│
├── models/
│   └── User.js
│
├── public/                  # Frontend static files
│   ├── index.html
│   ├── login.html
│   ├── lost.html
│   ├── found.html
│   ├── success.html
│   └── style.css
│
├── views/                   # EJS templates
│   └── admin.ejs            # Admin panel UI
│
├── uploads/                 # Uploaded images
│
├── Screenshots/             # README images
│   ├── Home.jpeg
│   ├── Login.jpeg
│   ├── Lost.jpeg
│   ├── Found.jpeg
│   └── Admin.jpeg
│
├── server.js                # Backend logic 
├── package.json,package-lock.json # Dependencies
├── .gitignore               # Ignored files (node_modules, etc.)
└── README.md                # Documentation


```

---

## 📸 Screenshots

![Home](screenshots/home.jpeg)
![Login](screenshots/login.jpeg)
![Lost](screenshots/lost.jpeg)
![Found](screenshots/found.jpeg)
![Admin](screenshots/admin.jpeg)
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/AbhishekSalunkhe241/lost-and-found-system.git
```

### 2️⃣ Navigate to project folder

```
cd lost-and-found-system
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Run the server

```
node server.js
```

### 5️⃣ Open in browser

```
http://localhost:3000
```

---

## 📌 Future Scope

* 📱 Mobile App Integration
* 🔔 Real-time Notifications
* 📍 Location-based item tracking
* 🤖 AI-based item matching

---

## 👨‍💻 Author

**Abhishek Salunkhe**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
