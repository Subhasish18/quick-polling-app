# 🗳️ Quick Polling App

A real-time **polling application** built using the **MERN stack** with **Socket.io** for instant updates.  
Users can **create polls, vote, and delete polls**, and polls automatically close after a set duration, displaying the winner.

---

## 🚀 **Technologies Used**
### **Frontend:**
- ⚛️ React (Vite)
- 🎨 CSS for styling
- 🔌 Axios (API calls)
- ⚡ Socket.io-client (real-time updates)

### **Backend:**
- 🛠️ Node.js + Express.js
- 🗄️ MongoDB Atlas (cloud database)
- 🌍 Cors (cross-origin support)
- ⚡ Socket.io (real-time communication)
- 🛑 Dotenv (environment variables)
- 🔄 Mongoose (MongoDB ORM)

---

## 📦 **Installation & Setup**</br>

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/quick-polling-app.git
cd quick-polling-app
```
2️⃣ Backend Setup </br>

```bash
Copy code
cd backend
npm install  # Install dependencies
```
Create a .env file inside backend/ and add:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/QuickPollingDB?retryWrites=true&w=majority
```
Replace <username> and <password> with your MongoDB Atlas credentials.


Run the backend

```bash
npm start
```
The server runs on: http://localhost:5000

3️⃣ Frontend Setup
```bash
Copy code
cd ../frontend
npm install  # Install dependencies
```

Run the frontend
```bash
Copy code
npm run dev
```

Frontend runs on: http://localhost:5173

🏆 How to Use </br>

1️⃣ Create a Poll:

Enter a question. </br>
Add options. </br>
Set a timer (poll duration in seconds).</br>
Click "Create Poll".</br>

2️⃣ Vote on a Poll:</br>

Click a poll option to vote.</br>
Vote count updates instantly via Socket.io.</br>

3️⃣ Poll Timer (Auto-Close):</br>

Polls automatically close when the timer ends.</br>
The winning option is displayed.</br>

4️⃣ Delete a Poll:</br>

Click 🗑️ Delete to remove a poll.</br>


🔥 Future Improvements</br>
✅ Live results bar graph 📊</br>
✅ User authentication (login required to vote) 🔑</br>
✅ Dark mode 🌙</br>

📝 Contributing</br>
Feel free to contribute! Fork the repo, make changes, and open a PR.</br>

⚡ Author</br>
Subhasish Das</br>
