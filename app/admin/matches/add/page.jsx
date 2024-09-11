"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddMatchPage = () => {
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [status, setStatus] = useState('in-time');
    const [videoUrl, setVideoUrl] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [tournament, setTournament] = useState('');
    const [teamAImg, setTeamAImg] = useState(''); // New state for Team A image URL
    const [teamBImg, setTeamBImg] = useState(''); // New state for Team B image URL
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch('/api/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ teamA, teamB, status, videoUrl, matchDate, tournament, teamAImg, teamBImg }), // Include teamAImg and teamBImg
        });

        if (response.ok) {
            router.push('/admin/matches');
        } else {
            const { message } = await response.json();
            setError(message);
        }
    };

    return (
        <div>
            <h1>Add New Match</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Team A:
                    <input
                        type="text"
                        value={teamA}
                        onChange={(e) => setTeamA(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Team A Image URL:
                    <input
                        type="url"
                        value={teamAImg}
                        onChange={(e) => setTeamAImg(e.target.value)}
                    />
                </label>
                <label>
                    Team B:
                    <input
                        type="text"
                        value={teamB}
                        onChange={(e) => setTeamB(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Team B Image URL:
                    <input
                        type="url"
                        value={teamBImg}
                        onChange={(e) => setTeamBImg(e.target.value)}
                    />
                </label>
                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="in-time">In Time</option>
                        <option value="live">Live</option>
                        <option value="end">End</option>
                    </select>
                </label>
                <label>
                    Video URL:
                    <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </label>
                <label>
                    Match Date:
                    <input
                        type="date"
                        value={matchDate}
                        onChange={(e) => setMatchDate(e.target.value)}
                    />
                </label>
                <label>
                    Tournament:
                    <input
                        type="text"
                        value={tournament}
                        onChange={(e) => setTournament(e.target.value)}
                        required
                    />
                </label>
                {error && <p>{error}</p>}
                <button type="submit">Add Match</button>
            </form>
        </div>
    );
};

export default AddMatchPage;
