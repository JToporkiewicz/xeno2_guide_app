import React from "react";
import HomePage from "./HomePage";
import DriversListPage from "./DriversListPage";
import { Route } from "react-router-dom";
import Navigation from "../Navigation";
import DriverPage from "./DriverPage";

function App() {
    return(
        <div className="container-fluid flex-grow-1">
            <div className="row">
                <Navigation />
                <div className="col-md-10 background">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/driverslist" component={DriversListPage} />
                    <Route path="/driver/:slug" component={DriverPage} />
                </div>
            </div>
        </div>
    );
}

export default App;