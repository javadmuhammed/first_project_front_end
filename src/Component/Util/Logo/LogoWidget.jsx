import React, { Fragment } from 'react'
import Logo from './assets/images/logo.svg'
import { Link } from 'react-router-dom'


function LogoWidget() {
  return (
    <Fragment>
      <div className="res_main_logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="main_logo" id="logo">
        <Link to={"/"}><img src={Logo} alt="" /></Link>
      </div>
    </Fragment>
  )
}

export default LogoWidget
