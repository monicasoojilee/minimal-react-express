import "core-js";
import "regenerator-runtime";
import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import axios from "axios";

const App = () => {

  const [ input, setInput ] = useState("");
  const [ getRequest, setGetRequest ] = useState("");
  const [ postRequest, setPostRequest ] = useState("");
  
  const onSubmit = event => {
    setInput("");
    axios.post("/api/world", { post: input })
    .then(res => {
      setPostRequest(res.data);
    })
    .catch(err => console.log(err));
    event.preventDefault();
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get("/api/hello");
      setGetRequest(response.data);
    }

    try {
      fetchAPI();
    } catch (err) {
      console.log('Error: GET request ', err)
    }
  }, []);

  return(
    <div className="App">
      <h1>Ready to Build: :3</h1>
      <h3>Roll Call: {getRequest}</h3>
      
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={ev => setInput(ev.target.value)}/>
        <button type="submit">Search</button>
      </form>
      
      {postRequest ? 
        <h3>Response: {postRequest}</h3>
        :
        <h3>Send a Reply Message.</h3>
      }
      
    </div>
  );
}

export default hot(module)(App);