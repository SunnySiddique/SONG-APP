import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import Feed from "../Feed/Feed";
import Library from "../Library/Library";
import Player from "../Player/Player";
import Trending from "../Trending/Trending";
import Sidebar from "../../components/sidebar/Sidebar";
import './home.css';
import Login from "../auth/Login";
import { useEffect, useState } from "react";
import { setClientToken } from "../../spotify";

const Home = () => {
  const [token, setTaken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if(!token && hash) {
      const _token =  hash.split("&")[0].split("=")[1];
      localStorage.setItem("token", _token);
      setTaken(_token);
      setClientToken(_token)
    }else{
      setTaken(token);
      setClientToken(token);
    }
  }, [])

  return ( !token ?(
    <Login />
  ) : (
    <div className="main-body">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  )

  );
};

export default Home;
