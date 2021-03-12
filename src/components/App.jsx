import React from "react";
import HomePage from "./HomePage";
import { Route } from "react-router-dom";

function App() {
    return(
        <div className="container-fluid">
            <Route path="/" exact component={HomePage} />
        </div>
    );
}

export default App;