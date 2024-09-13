import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './common/Button';
import './HomePage.css';

const HomePage = () => {
    const [mood, setMood] = useState('');
    const [moodInfo, setMoodInfo] = useState({ quote: '', songs: [], imageUrl: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated. Please log in.');
            navigate('/login');
        }
    }, [navigate]);

    const fetchMoodInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_MOOD_API_URL}/mood`, { mood }, { // Use MOOD_API_URL for mood service
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data) {
                setMoodInfo({
                    quote: response.data.quote,
                    songs: response.data.songs,
                    imageUrl: response.data.image_url
                });
                setError('');
            } else {
                setError('Unexpected response format.');
            }
        } catch (err) {
            setError(err.response?.status === 401 ? 'Unauthorized. Please log in again.' : 'Error fetching mood information.');
        }
    };

    const handleMoodChange = (e) => setMood(e.target.value);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <Button onClick={handleLogout} label="Logout" className="logout-button" />
            <h1>What's Your Mood?</h1>
            <select value={mood} onChange={handleMoodChange} className="home-select">
                <option value="">Select your mood...</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="energized">Energized</option>
                <option value="sleepy">Sleepy</option>
                <option value="moody">Moody</option>
            </select>
            <Button onClick={fetchMoodInfo} label="Get Mood Info" className="home-button" />
            {error && <div className="home-message">{error}</div>}
            {moodInfo.quote && <div className="home-quote">{moodInfo.quote}</div>}
            {moodInfo.imageUrl && <img src={moodInfo.imageUrl} alt="Mood" className="home-image" />}
            {moodInfo.songs.length > 0 && (
                <>
                    <div className="songs-header">Here are some songs that will help you make it through the day</div>
                    <table className="songs-table">
                        <thead>
                            <tr>
                                <th>Song Title</th>
                                <th>Listen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moodInfo.songs.map((song) => (
                                <tr key={song.id} className="song-item">
                                    <td>{song.title}</td>
                                    <td><a href={song.url} target="_blank" rel="noopener noreferrer">Play</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default HomePage;
