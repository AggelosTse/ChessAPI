import { getData } from './fetchData.js';
import {averageAccuracy} from './averageAccuracy.js';
import { totalGames } from './totalGamesPlayed.js';
import { averageOpponentElo } from './averageOpponentElo.js';
import { winPercentage } from './winPercentages.js';
import { drawPercentage } from './drawPercentages.js';
import { losePercentage } from './losePercentages.js';
import { CommonOpenings } from './mostCommonOpening.js';
import { Streaks } from './streaks.js';
import { averageMoves } from './averageTotalMoves.js';



export const name = "Aggtsel";

const data = await getData();

averageAccuracy(data);

totalGames(data);

averageOpponentElo(data);

winPercentage(data);

drawPercentage(data);

losePercentage(data);

CommonOpenings(data);

Streaks(data);

averageMoves(data);
