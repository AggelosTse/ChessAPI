

export function losePercentage(dataFile,name)
{
    let lostByCheckmate = 0;
    let lostByResignation = 0;
    let lostByTimeOut = 0;

    let losetotal = 0;
    

    const finalLoseList = [];


    for(let i=0;i<dataFile.length;i++) 
    {
        if(!dataFile[i].white.result || !dataFile[i].black.result) continue


        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {
                if(dataFile[i].white.result.toLowerCase() === "checkmated")
                {
                    lostByCheckmate++;
                    losetotal++;
                }
                else if(dataFile[i].white.result.toLowerCase() === "resigned")
                    {
                        lostByResignation++;
                        losetotal++;
                    }
                else if(dataFile[i].white.result.toLowerCase() === "timeout")
                        {
                            lostByTimeOut++;
                            losetotal++;
                        }    
            
        }

        else if (dataFile[i].black.username.toLowerCase() === name.toLowerCase())
        {
                    if(dataFile[i].black.result.toLowerCase() === "checkmated")
                    {
                        lostByCheckmate++;
                        losetotal++;
                    }
                    else if(dataFile[i].black.result.toLowerCase() === "resigned")
                        {
                            lostByResignation++;
                            losetotal++;
                        }
                    else if(dataFile[i].black.result.toLowerCase() === "timeout")
                        {
                             lostByTimeOut++;
                             losetotal++;
                         }  
                
        }

        
    }

    if(losetotal === 0) 
    {
        return [0,0,0,0,0,0];
    }
        
        
    console.log("Loses By Checkmates: \n");
    console.log(    "Total checkmate loses: " + lostByCheckmate + "\n");
    console.log(    "Checkmate loses percentage: " + Math.round((lostByCheckmate/losetotal)*100) + "\n");

    finalLoseList.push(lostByCheckmate,Math.round((lostByCheckmate/losetotal)*100));

    console.log("Loses By Resignation: \n");
    console.log(    "Total Resignation loses: " + lostByResignation + "\n");
    console.log(    "Resignation loses percentage: " + Math.round((lostByResignation/losetotal)*100) + "\n");

    finalLoseList.push(lostByResignation,Math.round((lostByResignation/losetotal)*100));

    console.log("Loses By timeout: \n");
    console.log(    "Total timeout loses: " + lostByTimeOut + "\n");
    console.log(    "Timeout loses percentage: " + Math.round((lostByTimeOut/losetotal)*100) + "\n");

    finalLoseList.push(lostByTimeOut,Math.round((lostByTimeOut/losetotal)*100));

    return finalLoseList;
}