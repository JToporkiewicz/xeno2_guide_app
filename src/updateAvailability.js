import client from './api-client'

export default async function updateAvailability(newData){
    const toUpdate = {"affinityChartNode": [], "blade": [], "heart2Heart": [], "quest": []}
    for(const key of Object.keys(toUpdate)){
        toUpdate[key] = await getEntriesToUpdate(key)
    }
    for(const key of Object.keys(toUpdate)){
        if(toUpdate[key].length > 0){
            await updateEntryAvailability(key, toUpdate[key], newData)
        }
    }
}

async function getEntriesToUpdate(area){
    const allEntries = await client.resource(area).find();
    const filteredEntries = allEntries.filter(entry => 
        {
            if(Object.keys(entry).includes("Prerequisites") && entry["Prerequisites"].includes("Story progress")){
                return true
            }
            else if(!entry["Available"]){
                entry["Available"] = true
                client.resource(area).update(entry["id"], entry)
            }
        })
    return filteredEntries
}

async function updateEntryAvailability(area, entries, newData){
    entries.forEach((entry) => {
        var entryStoryProgress = JSON.parse(entry["Prerequisites"])["Story progress"]
        entry["Available"] = false
        if(Object.keys(entryStoryProgress).includes("New Game Plus")){
            if(entryStoryProgress["New Game Plus"] === newData["NewGamePlus"] || newData["NewGamePlus"]){
                if(Object.keys(entryStoryProgress).includes("Chapter")){
                    if(entryStoryProgress["Chapter"] <= newData["Chapter"]){
                        entry["Available"] = true
                    }
                }
                else {
                    entry["Available"] = true
                }
            }
        }
        else {
            if(Object.keys(entryStoryProgress).includes("Chapter")){
                if(entryStoryProgress["Chapter"] <= newData["Chapter"]){
                    entry["Available"] = true
                }
            }
        }
        client.resource(area).update(entry["id"], entry)
    })
}