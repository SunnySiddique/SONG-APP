import { useEffect, useState } from 'react';
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import apiClient from '../../spotify';
import SidebarButton from './SidebarButton';
import './sidebar.css';


const Sidebar = () => {


  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=1000&  auto=format&fit=crop&ixlib=rb-4.0.3& ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww'
  );
  useEffect(() => {
    apiClient.get("/me")
      .then(response => {
        const userData = response.data;
        const userImage = userData.images && userData.images.length > 0 ? userData.images[0].url : null;
  
        if (userImage) {
          setImage(userImage);
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching user data:', error);
        // You might want to set a default image or handle the error state here
      });
  }, []);
  
  return (
    <div className="sidebar-container">
    <img src={image} className="profile-img" alt="profile" />
    <div>
      <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
      <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
      <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
      <SidebarButton
        title="Favorites"
        to="/favorites"
        icon={<MdFavorite />}
      />
      <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
    </div>
    <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
  </div>



  )
}

export default Sidebar
