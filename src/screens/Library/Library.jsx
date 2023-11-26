import axios from "axios";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import './library.css';

const Library = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const rs = await axios.get(
          "https://v1.nocodeapi.com/helpful/spotify/FfUiQNQJvMsjiWtr/browse/featured?country=pk"
        );
        setPlaylists(rs.data.playlists.items);  
        console.log(rs.data); // Log fetched data to check its structure
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/player', {state: {id: id}})
  }
  

  return (
    <div className="screen-container">
      <div className="library-body">
      {playlists?.map((playlist) => (
        <div key={playlist.id}>
          {playlist.name && (
            <div className="playlist-card" onClick={() => playPlaylist(playlist.id)}>
              <img src={playlist.images[0].url} className="playlist-image" alt="Playlist-Art" />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
  
}

export default Library;
