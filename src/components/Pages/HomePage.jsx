import React from "react";
import HeaderContainer from "../CommonComponents/HeaderContainer";
import AboutPanel from "../HomePageComponents/AboutPanel";
import SettingsForm from "../HomePageComponents/SettingsForm";

function HomePage(){
    return (
        <>
            <HeaderContainer title="Xenoblade Chronicles 2" subtitle="Guide to completion"/>
            <AboutPanel />
            <SettingsForm />
        </>
    );
}

export default HomePage;