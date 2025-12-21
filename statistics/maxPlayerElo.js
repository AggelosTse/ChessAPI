export function maxelo(dataFile, name)
{
    let elolist = [];

    for(let i=0;i<dataFile.length;i++)
    {
        if(dataFile[i].white.username.tolower() === name.tolower())
        {
            elolist.push(dataFile[i].white.rating);
        }
       else if(dataFile[i].black.username.tolower() === name.tolower())
        {
            elolist.push(dataFile[i].black.rating);
        }
        

        return Math.max(0, ...elolist);
    }
}