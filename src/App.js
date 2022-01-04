import React, {useRef, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import {getDatabase, ref, set, onValue, get} from "firebase/database";
import {app} from "./firebaseApp";

const database = getDatabase(app);
const databseRef = ref(database, "users/");

function App() {
    const [loading, setLoading] = useState(true);
    const [dataDb, setDataDb] = useState([]);

    function writeUserData(data) {
        // database state
        setDataDb(data);
        console.log(dataDb)
        // database write
        set(databseRef, dataDb);
        setLoading(false);
    }

    useRef(() => {
        writeUserData("Bruno", "meh.bruno@yahoo.com", "image/de/bruno.jpg")
    }, [loading])

    if (loading) {
        return (
            <div className="App-header">
                <div>⚠️ Loading, please wait ...</div>
                <button onClick={() => {
                    writeUserData(["Enzo", "enzo@enzo.com", "enzo/image.jpg"])
                }}>Sending
                </button>
            </div>
        )
    } else if (!loading) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <button
                        onClick={() => {
                            writeUserData([{name:"Simba", email:"declic62@gmail.com", picture: "image/de/bruno.jpg"}]);
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
}

export default App;
