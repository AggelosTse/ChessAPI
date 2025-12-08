

export function streaks(dataFile,name)
{
   let results = [];

   let finalStreaksList = [];

    for(let i=0;i<dataFile.length;i++)
    {
        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile[i].white.result.toLowerCase() === "win")
            {
                results.push(dataFile[i].white.result);
            }
            else if(dataFile[i].white.result.toLowerCase() === "stalemate" || dataFile[i].white.result.toLowerCase() === "agreed" || dataFile[i].white.result.toLowerCase() === "repetition" || dataFile[i].white.result.toLowerCase() === "insufficient")
            {
                results.push("draw"); 
            }
            else if(dataFile[i].white.result.toLowerCase() === "checkmated" || dataFile[i].white.result.toLowerCase() === "resigned" || dataFile[i].white.result.toLowerCase() === "timeout")
            {
                results.push("lose");
            }
        }

        else if(dataFile[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile[i].black.result.toLowerCase() === "win")
                {
                    results.push(dataFile[i].black.result);
                }
                else if(dataFile[i].black.result.toLowerCase() === "stalemate" || dataFile[i].black.result.toLowerCase() === "agreed" || dataFile[i].black.result.toLowerCase() === "repetition" || dataFile[i].black.result.toLowerCase() === "insufficient")
                {
                    results.push("draw"); 
                }
                else if(dataFile[i].black.result.toLowerCase() === "checkmated" || dataFile[i].black.result.toLowerCase() === "resigned" || dataFile[i].black.result.toLowerCase() === "timeout")
                {
                    results.push("lose");
                }
        }
       
    }

    console.log(results);

    let tempWins = findWinStreak(results);
    let tempDraws = findDrawStreak(results);
    let tempLoses = findLoseStreak(results);

    finalStreaksList.push(tempWins,tempDraws,tempLoses);

    return finalStreaksList;
}

function findWinStreak(results) {
    const listOfWinCounts = [];
    let winCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "win") {
            winCounter++;
        } else if (winCounter > 0) {
            listOfWinCounts.push(winCounter);
            winCounter = 0;
        }
    }

    if (winCounter > 0) listOfWinCounts.push(winCounter);
    
    return Math.max(0, ...listOfWinCounts);
}


function findDrawStreak(results)
{
    const listOfDrawCounts = [];
    let drawCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "draw") {
            drawCounter++;
        } else if (drawCounter > 0) {
            listOfDrawCounts.push(drawCounter);
            drawCounter = 0;
        }
    }

    if (drawCounter > 0) listOfDrawCounts.push(drawCounter);

    return Math.max(0, ...listOfDrawCounts);

}

function findLoseStreak(results)
{
    const listOfLoseCounts = [];
    let loseCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "lose") {
            loseCounter++;
        } else if (loseCounter > 0) {
            listOfLoseCounts.push(loseCounter);
            loseCounter = 0;
        }
    }

    if (loseCounter > 0) listOfLoseCounts.push(loseCounter);

   

    return Math.max(0, ...listOfLoseCounts);
}





