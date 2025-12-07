
export function winPercentage(dataFile,name)
{
    let wonByCheckmate = 0;
    let wonByResignation = 0;
    let wonByTimeOut = 0;

    let totalwins = 0;

    const finalWinList = [];

    for(let i=0;i<dataFile.length;i++) 
    {
        if(!dataFile[i].white.result || !dataFile[i].black.result) continue


        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile[i].white.result.toLowerCase() === "win")
            {
                if(dataFile[i].black.result.toLowerCase() === "checkmated")
                {
                    wonByCheckmate++;
                    totalwins++;
                }
                else if(dataFile[i].black.result.toLowerCase() === "resigned")
                    {
                        wonByResignation++;
                        totalwins++;
                    }
                else if(dataFile[i].black.result.toLowerCase() === "timeout")
                        {
                            wonByTimeOut++;
                            totalwins++;
                        }    
            }
        }

        else if (dataFile[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile[i].black.result.toLowerCase() === "win")
                {
                    if(dataFile[i].white.result.toLowerCase() === "checkmated")
                    {
                        wonByCheckmate++;
                        totalwins++;
                    }
                    else if(dataFile[i].white.result.toLowerCase() === "resigned")
                        {
                            wonByResignation++;
                            totalwins++;
                        }
                    else if(dataFile[i].white.result.toLowerCase() === "timeout")
                        {
                             wonByTimeOut++;
                             totalwins++;
                         }  
                }
        }

        
    }
    if(totalwins === 0)
    {
        console.log("No wins found.");
        finalWinList.push("NA");
        return;
    }

    console.log("Wins By Checkmates: \n");
    console.log(    "Total checkmate wins: " + wonByCheckmate + "\n");
    console.log(    "Checkmate wins percentage:: " + Math.round((wonByCheckmate/totalwins)*100) + "\n");

    finalWinList.push(wonByCheckmate,Math.round((wonByCheckmate/totalwins)*100));

    console.log("Wins By Resignation: \n");
    console.log(    "Total Resignation wins: " + wonByResignation + "\n");
    console.log(    "Rrsignation wins percentage:: " + Math.round((wonByResignation/totalwins)*100) + "\n");

    finalWinList.push(wonByResignation,Math.round((wonByResignation/totalwins)*100));

    console.log("Wins By timeout: \n");
    console.log(    "Total timeout wins: " + wonByTimeOut + "\n");
    console.log(    "Timeout wins percentage:: " + Math.round((wonByTimeOut/totalwins)*100) + "\n");

    finalWinList.push(wonByTimeOut,Math.round((wonByTimeOut/totalwins)*100));

    return finalWinList;
}