export async function getYearsData(name, subOption) {
    const yearToFetch = parseInt(subOption);
    if (!yearToFetch || !name) return [];

    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1; // 1-indexed


    const maxMonth = (yearToFetch === currentYear) ? currentMonth : 12;

    const fetchPromises = [];

    for (let i = 1; i <= maxMonth; i++) {
        const month = String(i).padStart(2, '0');
        const url = `https://api.chess.com/pub/player/${name}/games/${yearToFetch}/${month}`;
        
        fetchPromises.push(
            fetch(url)
                .then(res => res.ok ? res.json() : { games: [] })
                .catch(err => {
                    console.warn(`Skipping ${month}/${yearToFetch}:`, err);
                    return { games: [] };
                })
        );
    }

    const data = await Promise.all(fetchPromises);
    

    return data
        .flatMap(m => m.games || [])
        .sort((a, b) => b.end_time - a.end_time);
}