import React, { useState, useEffect } from "react";
import client from '../../api-client';
import HeaderContainer from "../CommonComponents/HeaderContainer";

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
        </div>
    );
}

export default HomePage;