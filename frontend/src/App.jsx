import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(30); 

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get("http://localhost:5000/polls");
        setPolls(res.data);
      } catch (error) {
        console.error(" Error fetching polls:", error);
      }
    };

    fetchPolls();

    socket.on("pollCreated", (poll) => setPolls((prev) => [...prev, poll]));
    socket.on("pollUpdated", (updatedPoll) => {
      setPolls((prev) => prev.map((p) => (p._id === updatedPoll._id ? updatedPoll : p)));
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollUpdated");
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) => {
          if (poll.status === "active" && poll.duration > 0) {
            return { ...poll, duration: poll.duration - 1 };
          } else if (poll.status === "active" && poll.duration === 0) {
            return { ...poll, status: "ended" };
          }
          return poll;
        })
      );
    }, 1000); 

    return () => clearInterval(interval);
  }, [polls]);

  const createPoll = async () => {
    try {
      const res = await axios.post("http://localhost:5000/polls", {
        question,
        options: options.map((text) => ({ text, votes: 0 })),
        duration,
      });

      setPolls((prev) => [...prev, { ...res.data, duration }]); 
      setQuestion("");
      setOptions(["", ""]);
      setDuration(30);
    } catch (error) {
      console.error(" Error creating poll:", error);
    }
  };

  const deletePoll = async (pollId) => {
    try {
      await axios.delete(`http://localhost:5000/polls/${pollId}`);
      setPolls((prev) => prev.filter((poll) => poll._id !== pollId));
    } catch (error) {
      console.error(" Error deleting poll:", error);
    }
  };

  const vote = async (pollId, optionIndex) => {
    if (polls.find((p) => p._id === pollId)?.status === "ended") return; 
    try {
      socket.emit("vote", { pollId, optionIndex });
    } catch (error) {
      console.error(" Error voting:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Quick Polling App</h1>
      <div className="poll-form">
        <input className="input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Poll question" />
        {options.map((opt, idx) => (
          <input key={idx} className="input" value={opt} onChange={(e) => { let newOpts = [...options]; newOpts[idx] = e.target.value; setOptions(newOpts); }} placeholder="Option" />
        ))}
        <input className="input" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (seconds)" />
        <button className="button" onClick={createPoll}>Create Poll</button>
      </div>
      <h2 className="subtitle">Active Polls</h2>
      <div className="poll-list">
        {polls.map((poll) => (
          <div key={poll._id} className="poll-card">
            <h3>{poll.question}</h3>
            <p className="timer">⏳ Time Left: {poll.status === "ended" ? "Ended" : `${poll.duration} sec`}</p>
            {poll.status === "active" ? (
              poll.options.map((opt, idx) => (
                <button key={idx} className="vote-button" onClick={() => vote(poll._id, idx)}>
                  {opt.text} ({opt.votes})
                </button>
              ))
            ) : (
              <p className="result">🏆 Winner: {poll.options.reduce((a, b) => (a.votes > b.votes ? a : b)).text}</p>
            )}
            <button className="delete-button" onClick={() => deletePoll(poll._id)}> Delete</button> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
