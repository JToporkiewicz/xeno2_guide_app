import React, { useState, useEffect } from "react";
import client from '../api-client';

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
        <div className="jumbotron">
            <h1>Xenoblade 2 Guide to 100%</h1>
            <div> This is progress: {progress}</div>
        </div>
    );
}

export default HomePage;