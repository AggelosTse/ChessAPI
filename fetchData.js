import { getDaysData,getMonthsData,getYearsData } from "./getUserDataChoise.js";

export async function getData(name,mainOption,subOption)
{

    const checkurl = `https://api.chess.com/pub/player/${name}`;

    const checkresponse = await fetch(checkurl);
    if(checkresponse.status !== 200)
    {
        console.log("No player name found. \n");
        return [];
    }


    let data = [];
    switch(mainOption)         
    {
        case "Days":
            {
                data = await getDaysData(name, subOption);
                
                break;
            }
        case "Months":
            {
                data = await getMonthsData(name, subOption);
                break;
            }
        case "Years":
            {
                data = await getYearsData(name, subOption);
                break;
            }
    }




   
    return data;
}
