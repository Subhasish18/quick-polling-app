const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();
const pollRoutes = require("./routes/pollRoutes"); 
const Poll = require("./models/Poll"); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  dbName: "QuickPollingDB"
})
.then(() => console.log(" MongoDB Connected Successfully"))
.catch(err => console.error(" MongoDB Connection Error:", err));


app.use("/polls", pollRoutes);


io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("vote", async ({ pollId, optionIndex }) => {
    try {
      const poll = await Poll.findById(pollId);
      if (!poll) {
        console.error(" Poll not found");
        return;
      }

      poll.options[optionIndex].votes += 1; 
      await poll.save();

      io.emit("pollUpdated", poll); 
      console.log(` Vote recorded for poll: ${pollId}`);
    } catch (error) {
      console.error(" Error processing vote:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => console.log(" Server running on port 5000"));
