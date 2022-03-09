import React, { useState, useEffect } from 'react';
import client from '../../api-client';
import { Link } from "react-router-dom";
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';

/*async function fetchOneData(setDetails, id, source){
    try {
        const response = await client.resource(source).get(id);
        setDetails(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};*/

async function fetchTwoData(setDetails, dataId1, dataId2, source){
    try {
        const item1 = await client.resource(source).get(dataId1);
        const item2 = await client.resource(source).get(dataId2);
        setDetails([item1, item2]);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

function DriverBasicInfoComponent (props) {
    const driverDetails = props.driverDetails;
    const [itemDetails, setItems] = useState([]);
    const [itemTypeDetails, setItemTypes] = useState([]);
    const [ideas, setIdeas] = useState({});
    const [dataLoaded, setLoadingStatus] = useState(false);

    useEffect(() => {
        if(driverDetails.FavItem1 && driverDetails.FavItem2 && driverDetails.IdeaStats && driverDetails.FavItemType1 && driverDetails.FavItemType2) {
            fetchTwoData(setItems, driverDetails.FavItem1, driverDetails.FavItem2, 'item');
            fetchTwoData(setItemTypes, driverDetails.FavItemType1, driverDetails.FavItemType2, 'itemType');
            setIdeas(JSON.parse(driverDetails.IdeaStats));
        }
    }, [driverDetails.FavItem1, driverDetails.FavItem2, driverDetails.FavItemType1, driverDetails.FavItemType2, driverDetails.IdeaStats, driverDetails.length, driverDetails])

    useEffect(() => {
        if(itemDetails.length > 0 && itemTypeDetails.length > 0 && Object.keys(ideas).length > 0) {
            setLoadingStatus(true);
        }
        else setLoadingStatus(false);
    }, [ideas, itemDetails, itemTypeDetails]);

    return (
        <CollapsibleComponent header={"Basic information"}>
            {dataLoaded ? 
            <>
            <img
                src={"/images/driver/"+driverDetails.Name.replace(/\s+/g, '')+".jpeg"}
                alt={driverDetails.Name}
                className="basic-info-image"/>
            Chapter unlocked: {driverDetails.ChapterUnlocked}
            <br />
            <>Favourite Items: 
                {' '}<Link to={"/item/" + itemDetails[0].id}>{itemDetails[0].Name}</Link>, 
                {' '}<Link to={"/item/" + itemDetails[1].id}>{itemDetails[1].Name}</Link>
            </>
            <br />
            <>Favourite Item Types: 
                {' '}<Link to={"/itemType/" + itemTypeDetails[0].id}>{itemTypeDetails[0].ItemType}</Link>, 
                {' '}<Link to={"/itemType/" + itemTypeDetails[1].id}>{itemTypeDetails[1].ItemType}</Link>
            </>
            <br />
            Starting idea stats: 
            <ul>
                {Object.entries(ideas).map(([idea, level]) => (
                    <li key={idea}>{idea}: {level}</li>
                ))}
            </ul>
            </>
        :
            <>
            Chapter unlocked: unknown<br />
            Favourite Items: unknown<br />
            Favourite Item Types: unknown<br />
            Starting idea stats: unknown
            </>
            }           
        </CollapsibleComponent>
    )
};

export default DriverBasicInfoComponent;