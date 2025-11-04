import { writeFile } from "node:fs/promises";


async function getData()
{
    const url = 'https://api.chess.com/pub/player/Aggtsel/games/2025/11';


    const response = await fetch(url);

    if(!response.ok)
    {
        console.error(response.status);
    }

    const dataFile = await response.json();

    await writeFile("./chessPGN.json", JSON.stringify(dataFile, null, 2), "utf8");
  
    return dataFile;
}

function calculateAverageAccuracy(dataFile)
{
    let sum = 0;
    let pl = 0;
  

    for(let i=0; i<dataFile.games.length;i++)
    {
       
        if(!dataFile.games[i].accuracies) continue;

        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].accuracies.white;
            pl++;
        }
        else if(dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].accuracies.black;
            pl++;
        }
    }
    console.log(sum/pl);

}

function calculateSumOfGames(dataFile)
{

    console.log("sum of games: " + dataFile.games.length + "\n");
}

function calculateAverageOpponentElo(dataFile)
{
    let pl = 0;
    let sum = 0;
    

    for(let i=0;i<dataFile.games.length;i++)
    {
        if(!dataFile.games[i].white.rating || !dataFile.games[i].black.rating) continue


        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].black.rating;
            pl++;
        }
        else if (dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].white.rating;
            pl++
        }
       
    }
    console.log("Average opponent elo: " + sum/pl + "\n");
}

function calculateWInPercentage(dataFile)
{
    let wonByCheckmate = 0;
    let wonByResignation = 0;
    let wonByTimeOut = 0;

    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
            {
                if(dataFile.games[i].black.result.toLowerCase() === "checkmated")
                {
                    wonByCheckmate++;
                }
                else if(dataFile.games[i].black.result.toLowerCase() === "resigned")
                    {
                        wonByResignation++;
                    }
                else if(dataFile.games[i].black.result.toLowerCase() === "timeout")
                        {
                            wonByTimeOut++;
                        }    
            }
        }

        else if (dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
                {
                    if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                    {
                        wonByCheckmate++;
                    }
                    else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                        {
                            wonByResignation++;
                        }
                    else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
                        {
                             wonByTimeOut++;
                         }  
                }
        }

        
    }
    console.log("WinCheckmate: " + wonByCheckmate + "\n");
    console.log("WinResignation: " + wonByResignation + "\n");
    console.log("WinTimeout: " + wonByTimeOut + "\n");
}

function calculateDrawPercentage(dataFile)
{
    let drawByStalemate = 0;
    let drawByAgreement = 0;
    let drawByRepetition = 0;
    let drawByInsufficient = 0;
    for(let i=0;i<dataFile.games.length;i++) 
        {
            if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue

            if(dataFile.games[i].black.result.toLowerCase() === "stalemate" || dataFile.games[i].white.result.toLowerCase() === "stalemate")
            {
                drawByStalemate++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "agreed" || dataFile.games[i].white.result.toLowerCase() === "agreed")
            {
                drawByAgreement++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "repetition" || dataFile.games[i].white.result.toLowerCase() === "repetition")
                {
                    drawByRepetition++;
                }
            else if(dataFile.games[i].black.result.toLowerCase() === "insufficient" || dataFile.games[i].white.result.toLowerCase() === "insufficient")
                {
                    drawByInsufficient++;
                 }
        }

        console.log("DrawStalemate: " + drawByStalemate + "\n");
        console.log("DrawAgreed: " + drawByAgreement + "\n");
        console.log("DrawRepetition: " + drawByRepetition + "\n");
        console.log("DrawInsufficientMaterial: " + drawByInsufficient + "\n");
}

function calculateLosePercentage(dataFile)
{
    let lostByCheckmate = 0;
    let lostByResignation = 0;
    let lostByTimeOut = 0;

    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
            {
                if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                {
                    lostByCheckmate++;
                }
                else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                    {
                        lostByResignation++;
                    }
                else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
                        {
                            lostByTimeOut++;
                        }    
            }
        }

        else if (dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
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

        
    }
    console.log("LoseCheckmate: " + lostByCheckmate + "\n");
    console.log("LoseResign: " + lostByResignation + "\n");
    console.log("LostTimeout: " + lostByTimeOut + "\n");
}



function findMostCommonOpening(dataFile) {
    const whiteOpeningMap = new Map();
    const blackOpeningMap = new Map();
    const moveRegex = /\b(?:O-O-O|O-O|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?)\b/g;

    for (const game of dataFile.games) {
        if (!game.pgn) continue;

        const movesOnly = game.pgn
            .replace(/\[.*?\]/gs, " ")          // Remove headers
            .replace(/\{.*?\}|\(.*?\)|\$\d+/g, " ") // Remove comments and variations
            .replace(/\d+\.(\.\.)?/g, " ")      // Remove move numbers
            .replace(/\s+/g, " ")
            .trim();

        const moves = movesOnly.match(moveRegex);
        if (!moves) continue;

        const usernameWhite = game.white.username.toLowerCase();
        const usernameBlack = game.black.username.toLowerCase();

        if (usernameWhite === 'aggtsel') {
            if (moves.length >= 4) {
                const first4 = moves.slice(0, 4).join(" ");
                whiteOpeningMap.set(first4, (whiteOpeningMap.get(first4) || 0) + 1);
            }
        }

        if (usernameBlack === 'aggtsel') {
            if (moves.length >= 8) {
                // Black moves: take the first 4 moves made by Black (indices 1,3,5,7)
                const first4Black = [moves[1], moves[3], moves[5], moves[7]].join(" ");
                blackOpeningMap.set(first4Black, (blackOpeningMap.get(first4Black) || 0) + 1);
            }
        }
    }

    // Get most common White opening for Aggtsel
    let maxWhiteCount = 0, mostCommonWhite = "";
    for (const [opening, count] of whiteOpeningMap.entries()) {
        if (count > maxWhiteCount) {
            maxWhiteCount = count;
            mostCommonWhite = opening;
        }
    }

    // Get most common Black opening for Aggtsel
    let maxBlackCount = 0, mostCommonBlack = "";
    for (const [opening, count] of blackOpeningMap.entries()) {
        if (count > maxBlackCount) {
            maxBlackCount = count;
            mostCommonBlack = opening;
        }
    }

    console.log("Aggtsel's most common opening as White:", mostCommonWhite, "Count:", maxWhiteCount);
    console.log("Aggtsel's most common opening as Black:", mostCommonBlack, "Count:", maxBlackCount);
}


const data = await getData();

calculateAverageAccuracy(data);

calculateSumOfGames(data);

calculateAverageOpponentElo(data);

calculateWInPercentage(data);

calculateDrawPercentage(data);

calculateLosePercentage(data);

findMostCommonOpening(data);
