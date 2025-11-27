import { writeFile } from "node:fs/promises";

export async function getData(name,mainOption,subOption)
{
    


    const url = `https://api.chess.com/pub/player/ffijidbfi/games/2025/11`;



    const response = await fetch(url);

    if(!response.ok)
    {
        console.error("Response error: " + response.status);
    }

    const dataFile = await response.json();

    await writeFile("./chessPGN.json", JSON.stringify(dataFile, null, 2), "utf8");
  
    return dataFile;
}