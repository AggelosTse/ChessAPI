import {name} from './utils.js';


export function losePercentage(dataFile)
{
    let lostByCheckmate = 0;
    let lostByResignation = 0;
    let lostByTimeOut = 0;

    let losetotal = 0;
    
    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
                if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                {
                    lostByCheckmate++;
                    losetotal++;
                }
                else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                    {
                        lostByResignation++;
                        losetotal++;
                    }
                else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
                        {
                            lostByTimeOut++;
                            losetotal++;
                        }    
            
        }

        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
                    if(dataFile.games[i].black.result.toLowerCase() === "checkmated")
                    {
                        lostByCheckmate++;
                    }
                    else if(dataFile.games[i].black.result.toLowerCase() === "resigned")
                        {
                            lostByResignation++;
                        }
                    else if(dataFile.games[i].black.result.toLowerCase() === "timeout")
                        {
                             lostByTimeOut++;
                         }  
                
        }

        
    }
    console.log("LoseCheckmate: " + lostByCheckmate + "\n");
    console.log("LoseResign: " + lostByResignation + "\n");
    console.log("LostTimeout: " + lostByTimeOut + "\n");
}