import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import Queue from '../../components/Queue/Queue';
import SongCard from '../../components/SongCard/SongCard';
import Widgets from '../../components/Wedgest/Widgest';
import apiClient from '../../spotify';
import './player.css';

const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          console.log(res.data)
          setTracks(res.data.items);
          setCurrentTrack(res.data.items[0].track);
        });
    }
  }, [location.state]);

useEffect(() => {
  if (tracks.length > 0 && currentIndex >= 0 && currentIndex < tracks.length) {
    setCurrentTrack(tracks[currentIndex].track);
  }
}, [currentIndex, tracks]);


  return (
    <div className="screen-container flex">
      <div className="left-player-body">
      <AudioPlayer currentTrack={currentTrack} isPlaying={true} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} total={tracks} />
      <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
};

export default Player;
