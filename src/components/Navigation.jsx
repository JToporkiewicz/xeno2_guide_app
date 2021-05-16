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
            <div onClick={() => props.toggleNavigation()}>
                Collapse
            </div>
            <hr />
            <NavigationButton link="/" title="Home"/>
            <NavigationButton link="/driversList" title="Drivers"/>
        </div>
    );
}

export default Navigation;