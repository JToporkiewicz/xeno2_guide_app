import React from "react";
import HomePage from "./HomePage";
import DriversPage from "./DriversPage";
import { Route } from "react-router-dom";
import Navigation from "../Navigation";

function App() {
    return(
        <div className="container-fluid flex-grow-1">
            <div className="row">
                <Navigation />
                <div className="col-md-10 background">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/drivers" component={DriversPage} />
                </div>
            </div>
        </div>
    );
}

export default App;