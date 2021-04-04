import React from 'react';
import CollapsibleComponent from '../CommonComponents/CollapsibleComponent';

function AboutPanel () {
    return (
        <CollapsibleComponent header="About">
            <>
            Welcome to the Xenoblade 2 guide application! <br />
            This application is aimed at helping completionists find information about unlockable elements in the game Xenoblade Chronicles 2.<br />
            Using this application, you can also track the progress and monitor it easily.<br />
            The information tracked in this application includes: 
            <ul>
                <li>ways of unlocking specific blades</li>
                <li>blade affinity trees progress</li>
                <li>side quests steps</li>
                <li>heart-to-hearts prerequisites and outcomes</li>
                <li>driver skill trees progress</li>
                <li>unique monsters</li>
            </ul>
            Currently, the application does not include information about:
            <ul>
                <li>equipment sources</li>
                <li>interactive spots</li>
                <li>treasure chests</li>
            </ul>
        </>
        </CollapsibleComponent>
    )
};

export default AboutPanel;