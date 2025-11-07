import { writeFile } from "node:fs/promises";

const name = "Aggtsel";


async function getData()
{
    const url = `https://api.chess.com/pub/player/${name}/games/2025/11`;



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
    let generalSum = 0;
    let whiteSum = 0;
    let blackSum = 0;

    let generalPL = 0;
    let whitePL = 0;
    let blackPL = 0;
  

    for(let i=0; i<dataFile.games.length;i++)
    {
       
        if(!dataFile.games[i].accuracies) continue;

        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            generalSum += dataFile.games[i].accuracies.white;
            generalPL++;

            whiteSum += dataFile.games[i].accuracies.white;
            whitePL++;
        }
        else if(dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            generalSum += dataFile.games[i].accuracies.black;
            generalPL++;

            blackSum += dataFile.games[i].accuracies.black;
            blackPL++;
        }
    }
    if (generalPL === 0) {
        console.log("No games played in this period.");
        return;
    }

    console.log("General Accuracy:", (generalSum / generalPL).toFixed(2));

    if (whitePL > 0)
        console.log("White Accuracy:", (whiteSum / whitePL).toFixed(2));
    else
        console.log("No white games played in this period.");

    if (blackPL > 0)
        console.log("Black Accuracy:", (blackSum / blackPL).toFixed(2));
    else
        console.log("No black games played in this period.");
   
    

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


        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            sum += dataFile.games[i].black.rating;
            pl++;
        }
        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
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

    let totalwins = 0;


    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
            {
                if(dataFile.games[i].black.result.toLowerCase() === "checkmated")
                {
                    wonByCheckmate++;
                    totalwins++;
                }
                else if(dataFile.games[i].black.result.toLowerCase() === "resigned")
                    {
                        wonByResignation++;
                        totalwins++;
                    }
                else if(dataFile.games[i].black.result.toLowerCase() === "timeout")
                        {
                            wonByTimeOut++;
                            totalwins++;
                        }    
            }
        }

        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
                {
                    if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                    {
                        wonByCheckmate++;
                        totalwins++;
                    }
                    else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                        {
                            wonByResignation++;
                            totalwins++;
                        }
                    else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
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
        return;
    }

    console.log("Wins By Checkmates: \n");
    console.log(    "Total checkmate wins: " + wonByCheckmate + "\n");
    console.log(    "Checkmate wins percentage:: " + (wonByCheckmate/totalwins)*100 + "\n");

    console.log("Wins By Resignation: \n");
    console.log(    "Total Resignation wins: " + wonByResignation + "\n");
    console.log(    "Rrsignation wins percentage:: " + (wonByResignation/totalwins)*100 + "\n");

    console.log("Wins By timeout: \n");
    console.log(    "Total timeout wins: " + wonByTimeOut + "\n");
    console.log(    "Timeout wins percentage:: " + (wonByTimeOut/totalwins)*100 + "\n");
}

function calculateDrawPercentage(dataFile)
{
    let drawByStalemate = 0;
    let drawByAgreement = 0;
    let drawByRepetition = 0;
    let drawByInsufficient = 0;

    let drawtotal = 0;

    for(let i=0;i<dataFile.games.length;i++) 
        {
            if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue

            if(dataFile.games[i].black.result.toLowerCase() === "stalemate" || dataFile.games[i].white.result.toLowerCase() === "stalemate")
            {
                drawByStalemate++;
                drawtotal++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "agreed" || dataFile.games[i].white.result.toLowerCase() === "agreed")
            {
                drawByAgreement++;
                drawtotal++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "repetition" || dataFile.games[i].white.result.toLowerCase() === "repetition")
                {
                    drawByRepetition++;
                    drawtotal++;
                }
            else if(dataFile.games[i].black.result.toLowerCase() === "insufficient" || dataFile.games[i].white.result.toLowerCase() === "insufficient")
                {
                    drawByInsufficient++;
                    drawtotal++;
                 }
        }
        
        if(drawtotal === 0)
        {
            console.log("no draws found. \n")
            return;
        }


        console.log("Draws By Stalemates: \n");
        console.log(    "Total stalemate draws: " + drawByStalemate + "\n");
        console.log(    "Stalemate draws percentage:: " + (drawByStalemate/drawtotal)*100 + "\n");

        console.log("Draws By Agreement: \n");
        console.log(    "Total agreement draws: " + drawByAgreement + "\n");
        console.log(    "Agreement draws percentage: " + (drawByAgreement/drawtotal)*100 + "\n");


        console.log("Draws By Repetition: \n");
        console.log(    "Total repetition draws: " + drawByRepetition + "\n");
        console.log(    "Repetition draws percentage: " + (drawByRepetition/drawtotal)*100 + "\n");

        console.log("Draws By Insufficient material: \n");
        console.log(    "Total Insufficient material draws: " + drawByInsufficient + "\n");
        console.log(    "Insufficient material draws percentage: " + (drawByInsufficient/drawtotal)*100 + "\n");

        
}

function calculateLosePercentage(dataFile)
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
            if(dataFile.games[i].black.result.toLowerCase() === "win")
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
        }

        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
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

    let countHowManyWhiteCommon = 0;
    let countHowManyBlackCommon = 0;

    let howManyWonWhiteCommon = 0;
    let howManyWonBlackCommon = 0;

    // --- PASS 1: Find most common openings ---
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


        if (usernameWhite === name.toLowerCase() && moves.length >= 4) {
            const first4 = moves.slice(0, 4).join(" ");
            whiteOpeningMap.set(first4, (whiteOpeningMap.get(first4) || 0) + 1);
        }

        if (usernameBlack === name.toLowerCase() && moves.length >= 8) {
            const first4Black = [moves[1], moves[3], moves[5], moves[7]].join(" ");
            blackOpeningMap.set(first4Black, (blackOpeningMap.get(first4Black) || 0) + 1);
        }
    }

    // --- Find most common openings ---
    let maxWhiteCount = 0, mostCommonWhite = "";
    for (const [opening, count] of whiteOpeningMap.entries()) {
        if (count > maxWhiteCount) {
            maxWhiteCount = count;
            mostCommonWhite = opening;
        }
    }

    let maxBlackCount = 0, mostCommonBlack = "";
    for (const [opening, count] of blackOpeningMap.entries()) {
        if (count > maxBlackCount) {
            maxBlackCount = count;
            mostCommonBlack = opening;
        }
    }

    // --- PASS 2: Count wins using those openings ---
    for (const game of dataFile.games) {
        if (!game.pgn) continue;

        const movesOnly = game.pgn
            .replace(/\[.*?\]/gs, " ")
            .replace(/\{.*?\}|\(.*?\)|\$\d+/g, " ")
            .replace(/\d+\.(\.\.)?/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const moves = movesOnly.match(moveRegex);
        if (!moves) continue;

        // WHITE
        if (game.white.username.toLowerCase() === name.toLowerCase() && moves.length >= 4) {
            if (moves.slice(0, 4).join(" ") === mostCommonWhite) {
                countHowManyWhiteCommon++;
                if (game.white.result === "win") {
                    howManyWonWhiteCommon++;
                }
            }
        }

        // BLACK
        if (game.black.username.toLowerCase() === name.toLowerCase() && moves.length >= 8) {
            if ([moves[1], moves[3], moves[5], moves[7]].join(" ") === mostCommonBlack) {
                countHowManyBlackCommon++;
                if (game.black.result === "win") {
                    howManyWonBlackCommon++;
                }
            }
        }
    }


        


    console.log("Most common opening as White:", mostCommonWhite, 
                "Count:", maxWhiteCount,
                "Winrate:", howManyWonWhiteCommon/countHowManyWhiteCommon)
                

    console.log("Most common opening as Black:", mostCommonBlack, 
                "Count:", maxBlackCount,
                "Winrate:", howManyWonBlackCommon/countHowManyBlackCommon)

    }



function calculateStreaks(dataFile)
{
   let results = [];
    for(let i=0;i<dataFile.games.length;i++)
    {
        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
            {
                results.push(dataFile.games[i].white.result);
            }
            else 
            {
                results.push("lose");
            }
        }
        else if(dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
                {
                    results.push(dataFile.games[i].black.result);
                }
                else 
                {
                    results.push("lose");
                }
        }
        console.log(results);
    }
    findWinStreak(results);
    findLoseStreak(results);
}

function findWinStreak(results)
{
    
}

function findLoseStreak(results)
{

}

const data = await getData();

calculateAverageAccuracy(data);

calculateSumOfGames(data);

calculateAverageOpponentElo(data);

calculateWInPercentage(data);

calculateDrawPercentage(data);

calculateLosePercentage(data);

findMostCommonOpening(data);

calculateStreaks(data);