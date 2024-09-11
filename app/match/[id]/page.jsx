import React from 'react';
import Image from 'next/image';

const fetchMatch = async (id) => {
  const response = await fetch(`http://localhost:3000/api/matches/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch match data');
  }
  const data = await response.json();
  return data;
};

const MatchPage = async ({ params }) => {
  const { id } = params;
  let match;
  let error = '';

  try {
    match = await fetchMatch(id);
  } catch (err) {
    error = err.message;
  }

  if (error) return <div>{error}</div>;
  if (!match) return <div>Loading...</div>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full min-w-[100%] lg:max-w-[70%] px-4 py-8">
        <div className="bg-white shadow-md rounded-lg mb-8 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
           
                <Image
                  src={match.teamAImg}
                  alt={`${match.teamA} logo`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              <h2 className="text-xl font-semibold ml-4">{match.teamA}</h2>
            </div>
            
            <span className="text-2xl font-bold my-2 sm:my-0">VS</span>
            
            <div className="flex items-center mt-4 sm:mt-0">
              <h2 className="text-xl font-semibold mr-4">{match.teamB}</h2>
             
                <Image
                  src={match.teamBImg}
                  alt={`${match.teamB} logo`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
          
            </div>
          </div>
        </div>

        {/* Match Details Section */}
        <div className="bg-white shadow-md rounded-lg mb-8">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-2 sm:mb-0">
                {match.tournament}
              </h2>
              <p className="text-lg text-gray-600">
                Kick-off: {new Date(match.matchDate).toLocaleTimeString()} GMT
              </p>
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              {match.status === 'live' ? 'Live Match' : 'Match Details'}
            </h2>
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {match.status === 'live' && match.videoUrl ? (
                <iframe
                  src={match.videoUrl}
                  width="600"
                  height="400"
                  allowFullScreen
                  title="Match Video"
                  className="w-full max-w-4xl"
                ></iframe>
              ) : (
                <p className="text-gray-500">
                  {match.status === 'live'
                    ? 'Live video stream would appear here'
                    : 'Match video not available'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
