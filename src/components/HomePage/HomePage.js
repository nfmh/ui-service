import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../common/Button';
import './HomePage.css';

const HomePage = () => {
    const [mood, setMood] = useState('');
    const [moodInfo, setMoodInfo] = useState({ quote: '', songs: [], imageUrl: '' });
    const [songTitle, setSongTitle] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('access_token_cookie');
        console.log('Token from cookie:', token);
        if (!token) {
            setError('User not authenticated. Please log in.');
            navigate('/login');
        }
    }, [navigate]);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const fetchCSRFToken = async () => {
        const response = await axios.get(`${process.env.REACT_APP_MOOD_API_URL}/csrf-token`, { withCredentials: true });
        return response.data.csrf_token;
    };

    const fetchMoodInfo = async () => {
        try {
            const token = getCookie('access_token_cookie');
            const csrfToken = await fetchCSRFToken();
            const response = await axios.post(
                `${process.env.REACT_APP_MOOD_API_URL}/mood`, 
                { mood }, 
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'X-CSRFToken': csrfToken
                    },
                    withCredentials: true  // Send cookies
                }
            );

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
        document.cookie = "access_token_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    const handleSongSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie('access_token_cookie');
            const response = await axios.post(`${process.env.REACT_APP_MOOD_API_URL}/song`, 
            { mood: mood, title: songTitle, url: songUrl }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true  // Ensure cookies are sent
            });

            if (response.status === 201) {
                setMessage('New song added successfully.');
                setError('');
                setSongTitle('');
                setSongUrl('');
            } else {
                setError('Error adding song.');
            }
        } catch (err) {
            setError(err.response?.status === 404 ? 'Mood not found.' : 'Error adding song.');
        }
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
            {message && <div className="home-message success">{message}</div>}
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

            <div className="add-song-section">
                <h2>Would you like to add a song?</h2>
                <form onSubmit={handleSongSubmit}>
                    <div className="form-group">
                        <label htmlFor="songTitle">Song Title</label>
                        <input
                            id="songTitle"
                            type="text"
                            value={songTitle}
                            onChange={(e) => setSongTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="songUrl">Song URL</label>
                        <input
                            id="songUrl"
                            type="text"
                            value={songUrl}
                            onChange={(e) => setSongUrl(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" label="Add Song" className="add-song-button" />
                </form>
            </div>
        </div>
    );
};

export default HomePage;
