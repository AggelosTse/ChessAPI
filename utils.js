import { getData } from './fetchData.js';
import {averageAccuracy} from './averageAccuracy.js';
import { totalGames } from './totalGamesPlayed.js';
import { averageOpponentElo } from './averageOpponentElo.js';
import { winPercentage } from './winPercentages.js';
import { drawPercentage } from './drawPercentages.js';
import { losePercentage } from './losePercentages.js';
import { CommonOpenings } from './mostCommonOpening.js';
import { streaks } from './streak.js';
import { averageMoves } from './averageTotalMoves.js';
import { highestOpponentElo } from './highestOpponentElo.js';


export async function nextPhase(name,mainOption,subOption)
{
    const data = await getData(name,mainOption,subOption);

    averageAccuracy(data);

    totalGames(data);

    averageOpponentElo(data);

    highestOpponentElo(data);

    winPercentage(data);

    drawPercentage(data);

    losePercentage(data);

    CommonOpenings(data);

    streaks(data);

    averageMoves(data);


}
