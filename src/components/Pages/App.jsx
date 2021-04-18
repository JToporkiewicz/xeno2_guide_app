import React from "react";
import HomePage from "./HomePage";
import DriversListPage from "./DriversListPage";
import { Route, Switch } from "react-router-dom";
import Navigation from "../Navigation";
import DriverDetailsPage from "./DriverDetailsPage";
import Default from "./Default";

function App() {
    return(
        <div className="container-fluid flex-grow-1">
            <div className="row">
                <Navigation />
                <div className="col-md-10 background">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/driverslist" component={DriversListPage} />
                        <Route path="/driver/:slug" component={DriverDetailsPage} />
                        <Route component={Default} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default App;