import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { app } from "./firebaseApp";

const database = getDatabase(app);
const databseRef = ref(database, "users/");

function App() {
  const [loading, setLoading] = useState(true);
  const [dataDb, setDataDb] = useState([]);

  function writeUserData(name, email, imageUrl) {
    // database state
    setDataDb({ name, email, imageUrl });
    // database write
    set(databseRef, {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
    setLoading(false);
  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => {
            writeUserData("Simba", "declic62@gmail.com", "image/de/bruno.jpg");
            console.log(database);
          }}
        >
          Write
        </button>
        <label>
          Name:
          {loading ? <span>Loading...</span> : <span>{
            dataDb.name
            }</span>}
        </label>
      </header>
    </div>
  );
}

export default App;
