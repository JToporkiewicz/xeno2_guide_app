import React from "react";
import { Link } from "react-router-dom";

function NavigationButton(props) {

    return (
        <>
            <Link to={props.link} className="navigation-button">
                {props.title}
            </Link>
            <hr/>
        </>
    )
}

function Navigation(props){
    return (
        <div className="col-md-2 open-navigation">
            <h5 onClick={() => props.toggleNavigation()}>
                Collapse
            </h5>
            <hr />
            <NavigationButton link="/" title="Home"/>
            <NavigationButton link="/driversList" title="Drivers"/>
        </div>
    );
}

export default Navigation;