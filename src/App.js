import React, { useState } from "react";
import axios from "axios";

function App() {
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitData = () => {
    axios({
      method: "post",
      url: "/auth/login",
      data: data,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form action="http://localhost:3000/auth/login" method="post">
          <label>E-mail</label>
          <input
            onChange={(e) => onChange(e)}
            value={email}
            name="email"
            type="text"
            id="emailInput"
          ></input>
          <br />
          <label>Password</label>
          <input
            onChange={(e) => onChange(e)}
            value={password}
            name="password"
            type="password"
            id="passwordInput"
          ></input>
          <br />
          <button type="submit" onClick={() => submitData()}>
            login
          </button>
        </form>
        <p>email ou mdp incorrect</p>
      </header>
    </div>
  );
}

export default App;
