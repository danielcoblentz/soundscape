chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch") && changeInfo.status == 'complete') {
        const urlParams = new URLSearchParams(new URL(tab.url).search);
        const videoId = urlParams.get('v');
        if (videoId) {
            // Now you can use the video ID to get more details or to use it with a music recognition API
            console.log('YouTube Video ID:', videoId);
            // Optionally, you can extract the title from the tab to search on Spotify
            console.log('Video Title:', tab.title);
            // Function to handle Spotify search and other tasks
            searchSpotify(tab.title);
        }
    }
});

function searchSpotify(title) {
    // This is a placeholder for Spotify API interaction
    console.log('Searching Spotify for:', title);
    // You would add API calls here to find the song on Spotify
}

const SPOTIFY_CLIENT_ID = 'your_spotify_client_id';
const SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret';  // Be cautious with your client secret
const AUTH_URL = 'https://accounts.spotify.com/api/token';

async function authenticateSpotify() {
    const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

// Usage
authenticateSpotify().then(token => {
    console.log('Spotify Access Token:', token);
});
async function searchTrack(token, trackName) {
    const SEARCH_URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track&limit=1`;
    const response = await fetch(SEARCH_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.tracks.items[0];  // Assuming the first result is the desired track
}

async function addToPlaylist(token, trackUri) {
    const PLAYLIST_ID = 'your_playlist_id';  // Replace with your actual playlist ID
    const ADD_URL = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`;
    const response = await fetch(ADD_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [trackUri] })
    });
    return response.ok;
}
