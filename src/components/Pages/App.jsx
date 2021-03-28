import React from "react";
import HomePage from "./HomePage";
import { Route } from "react-router-dom";
import Navigation from "../Navigation";

function App() {
    return(
        <div class="container-fluid">
            <div class="row">
                <Navigation />
                <div class="col-md-10">
                    <Route path="/" exact component={HomePage} />
                </div>
            </div>
        </div>
    );
}

export default App;