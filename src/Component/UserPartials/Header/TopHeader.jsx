import React, { Fragment } from 'react'

import HeaderProductSearch from '../../Other/HeaderProductSearch'
import HeaderUserIcon from './HeaderUserIcon'
import LogoWidget from '../../Util/Logo/LogoWidget'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function TopHeader() {



    return (
        <Fragment>
            <div className="top-header-group">

                <div className="top-header">
                    <div className="container">

                        <LogoWidget></LogoWidget>
                        <HeaderProductSearch />


                        <div className="header_right">
                            <ul>
                                <li>
                                     <i className="uil uil-phone-alt"></i>+91 9744727684 
                                </li>
                                <li>
                                    <Link href="offers.html" className="offer-link"><i className="uil uil-gift"></i>Offers</Link>
                                </li>
                                <li>
                                    <Link to="/wishlist" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i> </Link>
                                </li>
                                <li className="ui dropdown">
                                    <HeaderUserIcon></HeaderUserIcon>

                                </li>
                               


                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default TopHeader
