export function averageAccuracy(dataFile,name)
{
    let generalSum = 0;
    let whiteSum = 0;
    let blackSum = 0;

    let generalPL = 0;
    let whitePL = 0;
    let blackPL = 0;
  
    const accuracyArray = [];

    for(let i=0; i<dataFile.length;i++)
    {
       
        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {

            if(!dataFile[i].accuracies || !dataFile[i].accuracies.white) continue;
            
            generalSum += dataFile[i].accuracies.white;
            generalPL++;

            whiteSum += dataFile[i].accuracies.white;
            whitePL++;
        }
        else if(dataFile[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(!dataFile[i].accuracies || !dataFile[i].accuracies.black) continue;

            generalSum += dataFile[i].accuracies.black;
            generalPL++;

            blackSum += dataFile[i].accuracies.black;
            blackPL++;
        }
    }
    if (generalPL === 0) {
        console.log("No games played in this period.");

        accuracyArray.push("NA");
        return [];
    }

    console.log("General Accuracy:", Math.round((generalSum / generalPL)));
    accuracyArray.push(generalSum / generalPL);

    if (whitePL > 0)
    {
        console.log("White Accuracy:", Math.round((whiteSum / whitePL)));
        accuracyArray.push(whiteSum / whitePL);
    }
    else 
    {

    
        console.log("No white games played in this period.");
        accuracyArray.push("NA");
    }

    if (blackPL > 0)
    {

    
        console.log("Black Accuracy:", Math.round((blackSum / blackPL)));
        accuracyArray.push(blackSum / blackPL);
    }

    else
    {

    
        console.log("No black games played in this period.");
        accuracyArray.push("NA");
   
    }

    return accuracyArray;
}