
export function highestOpponentElo(dataFile,name)
{

    let listOfHighestElo = [];
    let listOfHighestEloWon = [];

    const highestopplist = [];

    for(let i=0;i<dataFile.length;i++)
    {
        if(!dataFile[i].white || !dataFile[i].black) continue;

        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile[i].white.result === "win")
            {
                listOfHighestEloWon.push(dataFile[i].black.rating);   
            }
            listOfHighestElo.push(dataFile[i].black.rating);  
            
        }
        else if(dataFile[i].black.username.toLowerCase() === name.toLowerCase())
            {
                if(dataFile[i].black.result === "win")
                {
                    listOfHighestEloWon.push(dataFile[i].white.rating);   
                }
                listOfHighestElo.push(dataFile[i].white.rating);  
                
            }
            
    }
    
    console.log("Opponent wit the most elo you've played: " + Math.max(0, ...listOfHighestElo));
    console.log("Opponent with the most elo you've won: " + Math.max(0, ...listOfHighestEloWon));

    highestopplist.push(Math.max(0, ...listOfHighestElo),Math.max(0, ...listOfHighestEloWon));
    return highestopplist;
}