import { Link, useLocation } from 'react-router-dom'
import './sidebarButton.css'
import { IconContext } from 'react-icons'

// eslint-disable-next-line no-unused-vars
const SidebarButton = ({icon, title, to}) => {
    const location = useLocation();

    const isActive = location.pathname === to
    
    const btnClass = isActive ? "btn-body active": "btn-body"

  return (
    // eslint-disable-next-line react/prop-types
    <Link to={to}>
      <div className={btnClass}>
        <IconContext.Provider value={{size: '24px', className: "btn-icon"}}>
            {icon}
        <p className='btn-title'>{title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  )
}

export default SidebarButton
