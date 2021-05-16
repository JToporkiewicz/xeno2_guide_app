import client from './api-client'

export default async function updateAvailability(newData){
    var toUpdate = {monster: [], prerequisitesACN: [], prerequisitesBlade: [], prerequisitesH2H: [], prerequisitesMM: [], prerequisitesQuest: []}
    const areas = {monster: "monster", prerequisitesACN: "affinityChartNode", prerequisitesBlade: "blade", prerequisitesH2H: "heart2Heart", prerequisitesMM: "mercMission", prerequisitesQuest: "quest"}
    const relevantColumns = {
        monster: ["Location", "DLCRequired"],
        prerequisitesACN: ["Location", "StoryProgress"],
        prerequisitesBlade: ["StoryProgress", "NewGamePlus", "DLCUnlocked"],
        prerequisitesH2H: ["StoryProgress", "NewGamePlus", "DLCUnlocked", "InnLocation"],
        prerequisitesMM: ["StoryProgress", "DLCUnlocked"],
        prerequisitesQuest: ["StoryProgress", "NewGamePlus", "DLCUnlocked"]
    }
    for(const key of Object.keys(relevantColumns)){
        toUpdate[key] = await getEntriesToUpdate(key, relevantColumns[key])
    }
    const locations = await findRelevantLocations(newData["Chapter"])
    const relevantData = {
        StoryProgress: newData["Chapter"],
        NewGamePlus: newData["NewGamePlus"],
        DLCUnlocked: newData["DLCUnlocked"],
        Location: locations
    }
    console.log(toUpdate);
    console.log(relevantData);
    for(const key of Object.keys(toUpdate)){
        if(toUpdate[key].length > 0){
            await updateEntryAvailability(areas[key], toUpdate[key], relevantColumns[key], relevantData)
        }
    }
}

async function findRelevantLocations(chapter){
    try {
        var locations = []
        for(var chap = 1; chap <= chapter; chap++){
            var loc = await client.resource("location").find({StoryProgress: chap})
            locations = locations.concat(loc.map(l => l.id))
        }
        return locations;
    }
    catch(err){
        console.log(`Error: ${err}`);
    }
}

async function getEntriesToUpdate(area, relevantColumns){
    var entries = await client.resource(area).find();
    var filteredEntries = entries.filter(e => {
        for(var index = 0; index < relevantColumns.length; index++){
            var column = relevantColumns[index]
            if(e[column] !== null && e[column] !== 0 && e[column] !== -1 && e[column] !== "" && e[column] !== undefined){
                return true
            }
        }
        return false
        }
    )
    return filteredEntries
}

async function updateEntryAvailability(area, entries, relevantColumns, data){
    var available = false;
    entries.forEach((entry) => {
        var nonNullColumns = relevantColumns.filter((column) => 
            entry[column] !== null &&
            entry[column] !== 0 &&
            entry[column] !== -1 &&
            entry[column] !== "" &&
            entry[column] !== undefined)
        for(var index = 0; index < nonNullColumns.length; index++){
            var column = nonNullColumns[index]
            var requirementMet = false;
            switch(typeof(data[column === "InnLocation" ? "Location" : column])){
                case "object":
                    if(data[column === "InnLocation" ? "Location" : column].includes(entry[column])){
                        requirementMet = true;
                    }
                    break;
                case "number":
                    if(entry[column] <= data[column]){
                        requirementMet = true;
                    }
                    break;
                case "boolean":
                    if(entry[column] === false || entry[column] === data[column]){
                        requirementMet = true;
                    }
                    break;
                default:
                    requirementMet = false;
            }
            if(!requirementMet){
                available = false;
                break;
            }
            available = true;
        }
        if(Object.keys(entry).includes("Available")){
            client.resource(area).update(entry["id"], {"Available": available})
        }
        else{
            client.resource(area).update(entry["RequiredBy"], {"Available": available})
        }
    })
}