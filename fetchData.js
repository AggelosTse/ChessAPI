import { writeFile } from "node:fs/promises";
import {name} from './utils.js';



export async function getData()
{
    const url = `https://api.chess.com/pub/player/${name}/games/2024/05`;



    const response = await fetch(url);

    if(!response.ok)
    {
        console.error("Response error: " + response.status);
    }

    const dataFile = await response.json();

    await writeFile("./chessPGN.json", JSON.stringify(dataFile, null, 2), "utf8");
  
    return dataFile;
}