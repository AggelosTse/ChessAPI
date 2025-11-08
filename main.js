import { writeFile } from "node:fs/promises";

const name = "Hikaru";


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
       
        

        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {

            if(!dataFile.games[i].accuracies || !dataFile.games[i].accuracies.white) continue;
            
            generalSum += dataFile.games[i].accuracies.white;
            generalPL++;

            whiteSum += dataFile.games[i].accuracies.white;
            whitePL++;
        }
        else if(dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(!dataFile.games[i].accuracies || !dataFile.games[i].accuracies.black) continue;

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

            if(dataFile.games[i].black.result.toLowerCase() === "stalemate")
            {
                drawByStalemate++;
                drawtotal++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "agreed")
            {
                drawByAgreement++;
                drawtotal++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "repetition")
                {
                    drawByRepetition++;
                    drawtotal++;
                }
            else if(dataFile.games[i].black.result.toLowerCase() === "insufficient")
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

        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
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
    console.log("LoseCheckmate: " + lostByCheckmate + "\n");
    console.log("LoseResign: " + lostByResignation + "\n");
    console.log("LostTimeout: " + lostByTimeOut + "\n");
}



function findMostCommonOpening(dataFile) {
    const whiteOpeningMap = new Map();
    const blackOpeningMap = new Map();
    // Simplified regex: captures moves, ignores game result/comment markers
    const moveRegex = /[A-Z]?[a-h]?[1-8]?[x-]?[a-h][1-8](?:=[QRNKB])?|O-O(?:-O)?/g; 

    let countHowManyWhiteCommon = 0;
    let countHowManyBlackCommon = 0;
    let howManyWonWhiteCommon = 0;
    let howManyWonBlackCommon = 0;

    // --- PASS 1: Find most common openings ---
    for (const game of dataFile.games) {
        if (!game.pgn) continue;

        // 1. Clean PGN: Remove headers, move numbers, result markers, and comments
        const movesOnly = game.pgn
            .replace(/\[.*?\]/gs, "")       // Remove headers
            .replace(/\{.*?\}|\(.*?\)|\$\d+/g, "") // Remove comments and variations
            .replace(/\d+\.(\.\.)?/g, "")   // Remove move numbers
            .replace(/\s*[10]\s*-\s*[10]\s*/g, "") // Remove result markers (1-0, 0-1, 1/2-1/2)
            .trim();

        // 2. Extract moves using the regex
        const moves = movesOnly.match(moveRegex);
        if (!moves) continue;

        const usernameLower = name.toLowerCase();
        const usernameWhite = game.white.username.toLowerCase();
        const usernameBlack = game.black.username.toLowerCase();

        // White Opening: First 2 moves (4 half-moves required)
        if (usernameWhite === usernameLower && moves.length >= 4) {
            const first4 = moves.slice(0, 4).join(" ");
            whiteOpeningMap.set(first4, (whiteOpeningMap.get(first4) || 0) + 1);
        }

        // Black Opening: First 2 moves played by Black (4 half-moves required)
        if (usernameBlack === usernameLower && moves.length >= 4) { // MOVES.LENGTH >= 4 IS CONSISTENT
            // Black's moves are at indices 1 and 3 (2nd and 4th half-move)
            const firstBlackMoves = [moves[1], moves[3]].join(" ");
            blackOpeningMap.set(firstBlackMoves, (blackOpeningMap.get(firstBlackMoves) || 0) + 1);
        }
    }

    // --- Find most common openings (based on counts) ---
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
    
    // Safety check for division by zero
    if (maxWhiteCount === 0 && maxBlackCount === 0) {
        console.log("Not enough data to determine common openings.");
        return;
    }

    // --- PASS 2: Count wins using those most common openings ---
    for (const game of dataFile.games) {
        if (!game.pgn) continue;

        const movesOnly = game.pgn
            .replace(/\[.*?\]/gs, "")
            .replace(/\{.*?\}|\(.*?\)|\$\d+/g, "")
            .replace(/\d+\.(\.\.)?/g, "")
            .replace(/\s*[10]\s*-\s*[10]\s*/g, "")
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
        if (game.black.username.toLowerCase() === name.toLowerCase() && moves.length >= 4) { // MOVES.LENGTH >= 4 IS CONSISTENT
            const currentBlackMoves = [moves[1], moves[3]].join(" ");
            if (currentBlackMoves === mostCommonBlack) {
                countHowManyBlackCommon++;
                if (game.black.result === "win") {
                    howManyWonBlackCommon++;
                }
            }
        }
    }
    
    // --- Final Output ---
    console.log("\n--- Most Common Opening Analysis ---");
    
    if (maxWhiteCount > 0) {
        console.log("Most common opening as White:", mostCommonWhite);
        console.log("Count:", maxWhiteCount);
        console.log("Winrate:", (howManyWonWhiteCommon / countHowManyWhiteCommon).toFixed(3));
    } else {
        console.log("Not enough White games found for opening analysis.");
    }

    if (maxBlackCount > 0) {
        console.log("\nMost common opening as Black:", mostCommonBlack);
        console.log("Count:", maxBlackCount);
        console.log("Winrate:", (howManyWonBlackCommon / countHowManyBlackCommon).toFixed(3));
    } else {
        console.log("Not enough Black games found for opening analysis.");
    }
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
            else if(dataFile.games[i].white.result.toLowerCase() === "stalemate" || dataFile.games[i].white.result.toLowerCase() === "agreed" || dataFile.games[i].white.result.toLowerCase() === "repetition" || dataFile.games[i].white.result.toLowerCase() === "insufficient")
            {
                results.push("draw"); 
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
                else if(dataFile.games[i].black.result.toLowerCase() === "stalemate" || dataFile.games[i].black.result.toLowerCase() === "agreed" || dataFile.games[i].black.result.toLowerCase() === "repetition" || dataFile.games[i].black.result.toLowerCase() === "insufficient")
                {
                    results.push("draw"); 
                }
                else
                {
                    results.push("lose");
                }
        }
       
    }

    console.log(results);

    findWinStreak(results);
    findDrawStreak(results);
    findLoseStreak(results);
}

function findWinStreak(results) {
    const listOfWinCounts = [];
    let winCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "win") {
            winCounter++;
        } else if (winCounter > 0) {
            listOfWinCounts.push(winCounter);
            winCounter = 0;
        }
    }

    if (winCounter > 0) listOfWinCounts.push(winCounter);

    console.log("All win streaks:", listOfWinCounts);
    console.log("Longest win streak:", Math.max(0, ...listOfWinCounts));
}

function findDrawStreak(results)
{
    const listOfLoseCounts = [];
    let drawCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "draw") {
            drawCounter++;
        } else if (drawCounter > 0) {
            listOfLoseCounts.push(drawCounter);
            drawCounter = 0;
        }
    }

    if (drawCounter > 0) listOfLoseCounts.push(drawCounter);

    console.log("All lose streaks:", listOfLoseCounts);
    console.log("Longest lose streak:", Math.max(0, ...listOfLoseCounts));
}

function findLoseStreak(results)
{
    const listOfLoseCounts = [];
    let loseCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "lose") {
            loseCounter++;
        } else if (loseCounter > 0) {
            listOfLoseCounts.push(loseCounter);
            loseCounter = 0;
        }
    }

    if (loseCounter > 0) listOfLoseCounts.push(loseCounter);

    console.log("All lose streaks:", listOfLoseCounts);
    console.log("Longest lose streak:", Math.max(0, ...listOfLoseCounts));
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