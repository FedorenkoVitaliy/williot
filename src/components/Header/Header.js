import React from "react";
import "./Header.scss"

const Header = ({title, subtitle}) => {
  return(
    <div className="header">
      <p className='header__title'>{title}</p>
      <p className='header__subtitle'>{subtitle}</p>
    </div>
  )
}

export default Header;