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
        <>
            <HeaderContainer title="Xenoblade Chronicles 2" subtitle="Guide to completion"/>
            <AboutPanel />
            <div> This is progress: {progress}</div>
        </>
    );
}

export default HomePage;