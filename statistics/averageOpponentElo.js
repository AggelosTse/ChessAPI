export function averageOpponentElo(dataFile,name)
{
    let pl = 0;
    let sum = 0;
    

    for(let i=0;i<dataFile.length;i++)
    {
        if(!dataFile[i].white.rating || !dataFile[i].black.rating) continue


        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {
            sum += dataFile[i].black.rating;
            pl++;
        }
        else if (dataFile[i].black.username.toLowerCase() === name.toLowerCase())
        {
            sum += dataFile[i].white.rating;
            pl++
        }
       
    }
    if(pl === 0)
    {
        console.log("No opponents found. \n");
        return;
    }
    let average = Math.round(sum/pl);
    
    console.log("Average opponent elo: " + average + "\n");
    return average;
}