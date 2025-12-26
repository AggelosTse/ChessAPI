export async function getDaysData(name, subOption) {
    const subOptionList = [1, 3, 7, 14, 21, 30];
    if (!subOptionList.includes(subOption)) return [];

    const now = new Date();

    const priorDate = new Date(now);
    priorDate.setUTCDate(now.getUTCDate() - subOption);
    priorDate.setUTCHours(0, 0, 0, 0); 
    const priorDateTimestamp = Math.floor(priorDate.getTime() / 1000);

    const fetchPromises = [];
    let iterateDate = new Date(priorDate);
    iterateDate.setUTCDate(1); 

    while (iterateDate <= now) {
        const year = iterateDate.getUTCFullYear();
        const month = String(iterateDate.getUTCMonth() + 1).padStart(2, '0');
        const url = `https://api.chess.com/pub/player/${name}/games/${year}/${month}`;

        fetchPromises.push(
            fetch(url)
                .then(res => res.ok ? res.json() : { games: [] })
                .catch(err => {
                    console.error(`API Error for ${month}/${year}:`, err);
                    return { games: [] };
                })
        );

        // Move to the next month
        iterateDate.setUTCMonth(iterateDate.getUTCMonth() + 1);
    }

    // 3. Flatten, Filter, and Sort
    const monthlyData = await Promise.all(fetchPromises);
    const allGames = monthlyData.flatMap(m => m.games || []);
    
    return allGames
        .filter(game => game.end_time >= priorDateTimestamp)
        .sort((a, b) => b.end_time - a.end_time);
}