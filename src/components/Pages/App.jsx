import React, {useState} from "react";
import HomePage from "./HomePage";
import DriversListPage from "./DriversListPage";
import { Route, Switch } from "react-router-dom";
import Navigation from "../CommonComponents/Navigation/Navigation";
import ClosedNavigation from "../CommonComponents/Navigation/ClosedNavigation";
import DriverDetailsPage from "./DriverDetailsPage";
import Default from "./Default";

function App() {
    const [openNavigation, setNavigation] = useState(true);

    function toggleNavigation(){
        setNavigation(!openNavigation)
    }

    return(
        <div className="container-fluid flex-grow-1">
            <div className="row">
                {openNavigation ? 
                    <Navigation toggleNavigation={toggleNavigation.bind(this)}/>
                    :
                    <div/>
                }
                <div className={openNavigation ? "background col-md-10" : "background col-md-12"}>
                    {openNavigation ? 
                        <div/>
                        :
                        <ClosedNavigation toggleNavigation={toggleNavigation.bind(this)}/>
                    }
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