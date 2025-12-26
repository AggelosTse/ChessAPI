
export async function getMonthsData(name, subOption) {
    const validOptions = [1, 2, 3, 6, 9, 12];
    if (!validOptions.includes(subOption)) return [];

    const now = new Date();
    
 
    const cutoffDate = new Date(now);
    cutoffDate.setMonth(now.getMonth() - subOption);
    const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);

 
    const fetchPromises = [];
    let iterateDate = new Date(cutoffDate);

    iterateDate.setDate(1);

    while (iterateDate <= now) {
        const year = iterateDate.getFullYear();
        const month = String(iterateDate.getMonth() + 1).padStart(2, '0');
        const url = `https://api.chess.com/pub/player/${name}/games/${year}/${month}`;

        fetchPromises.push(
            fetch(url)
                .then(res => res.ok ? res.json() : { games: [] })
                .catch(() => ({ games: [] }))
        );

        iterateDate.setMonth(iterateDate.getMonth() + 1);
    }

    const data = await Promise.all(fetchPromises);
    
   
    return data
        .flatMap(m => m.games || [])
        .filter(game => game.end_time >= cutoffTimestamp)
        .sort((a, b) => b.end_time - a.end_time);
}