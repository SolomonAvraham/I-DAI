# I-DAI (Intelligent Death AI)

## 🚀 Overview  
**I-DAI** is a predictive web application that uses **AI models** to analyze user data (e.g., age, health status, lifestyle) and generate predictions on potential causes of death. The project integrates **Next.js, MongoDB, NextAuth.js, Zustand, and React Query**, ensuring a seamless user experience with secure authentication and efficient state management.  

## 🛠️ Tech Stack  
- **Frontend:** Next.js (React, TypeScript)  
- **State Management:** Zustand  
- **Data Fetching & Caching:** React Query  
- **Authentication:** NextAuth.js (JWT-based)  
- **Database:** MongoDB (Mongoose ODM)  
- **Backend:** Next.js API Routes  
- **Deployment:** Vercel / AWS  

## ✨ Features  
✔ **User Authentication & Authorization** – Secure login via NextAuth.js with JWT session handling.  
✔ **Dynamic AI-Based Predictions** – Users enter personal and health data, and the AI model provides an analysis.  
✔ **State Management with Zustand** – Optimized global state for UI responsiveness and better performance.  
✔ **Efficient Data Fetching with React Query** – Ensures fast and cached data loading.  
✔ **Scalable Backend with Next.js API Routes** – Handles AI model requests and user data securely.  
✔ **MongoDB Integration** – Stores user data and AI predictions with Mongoose ORM.  

## 🏗️ Installation & Setup  
### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/yourusername/i-dai.git
cd i-dai
```

### **2️⃣ Install Dependencies**  
```bash
npm install
# or
yarn install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env.local` file in the root directory and configure:  
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
MONGODB_URI=mongodb+srv://your_mongo_connection
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the Development Server**  
```bash
npm run dev
# or
yarn dev
```
Open `http://localhost:3000` in your browser.  

## 📡 API Endpoints  
| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| `POST` | `/api/auth/signup` | User registration               |
| `POST` | `/api/auth/login`  | User login                      |
| `POST` | `/api/predict`     | Submit user data for prediction |
| `GET`  | `/api/user`        | Fetch logged-in user data       |

## 📌 Future Enhancements  
🔹 AI Model Optimization for More Accurate Predictions  
🔹 UI/UX Improvements for Better User Experience  
🔹 Multi-Language Support  

## 📄 License  
This project is **MIT Licensed**
