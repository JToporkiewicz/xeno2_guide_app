import React, { useState, useEffect } from "react";
import client from '../../api-client';
import HeaderContainer from "../CommonComponents/HeaderContainer";
import AboutPanel from "../HomePageComponents/AboutPanel";

function HomePage(){
    const [progress, setProgress] = useState([])

    useEffect(() => {
        fetchProgress();
    }, [])

    async function fetchProgress(){
        try {
            const response = await client.resource('storyProgress').get(1);
            setProgress(response.Chapter)
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    return (
        <div>
            <HeaderContainer title="Xenoblade Chronicles 2" subtitle="Guide to completion"/>
            <div> This is progress: {progress}</div>
            <AboutPanel />
        </div>
    );
}

export default HomePage;