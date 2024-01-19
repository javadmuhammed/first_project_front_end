 
import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function SubHeader() {

    let cartData = useSelector((state) => state.userCart);

    return (
        <Fragment>
            <div className="sub-header-group">
                <div className="container">
                    <div className="sub-header">
                        <div className="ui dropdown">
                            <a href="#" class="category_drop hover-btn" data-toggle="modal" data-target="#category_model" title="Categories"><i class="uil uil-apps"></i><span class="cate__icon">Select Category</span></a>						</div>
                        <nav className="navbar navbar-expand-lg navbar-light py-3">
                            <div className="container-fluid">
                                <button className="navbar-toggler menu_toggle_btn" type="button" data-target="#navbarSupportedContent"><i className="uil uil-bars"></i></button>
                                <div className="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark1 p-3 p-lg-0 mt1-5 mt-lg-0 mobileMenu" id="navbarSupportedContent">
                                    <ul className="navbar-nav main_nav align-self-stretch">
                                        <li className="nav-item"><Link to="/" className="nav-link active" title="Home">Home</Link></li>
                                        <li className="nav-item"><Link to="/product_searching" className="nav-link new_item" title="New Products">All Products</Link></li>
                                         <li className="nav-item"><Link to="contact_us.html" className="nav-link" title="Contact">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="header_cart order-1">
                            <a href="#" className="cart__btn hover-btn pull-bs-canvas-left" title="Cart"><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>{cartData.numberOfItems ?? 0}</ins><i className="uil uil-angle-down"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SubHeader
