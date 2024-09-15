import dynamic from 'next/dynamic';
import MatchCard from '../components/MatchCard';

const fetchMatches = async () => {
    const response = await fetch('https://kooranext.vercel.app/api/matches', {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch matches');
    }
    return response.json();
};

const AdsComponent = dynamic(() => import('../components/AdsComponent'), { ssr: false });

const MatchOverviewPage = async () => {
    let matches = [];
    let error = '';

    try {
        matches = await fetchMatches();
    } catch (err) {
        error = err.message;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Match Overview</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex justify-center my-4">
                <AdsComponent />
            </div>

            <ul className="space-y-4">
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <li key={match._id} className="flex justify-center">
                            <MatchCard match={match} />
                        </li>
                    ))
                ) : (
                    <p>No matches available.</p>
                )}
            </ul>

            <div className="flex justify-center my-4">
                <AdsComponent />
            </div>
        </div>
    );
};

export default MatchOverviewPage;
