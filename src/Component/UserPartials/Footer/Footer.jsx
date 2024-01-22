
import React, { Fragment, useEffect, useState } from 'react'


import SocialMediaLinks from './SocialMediaLinks.jsx';
import CopyRight from './CopyRight.jsx';
import FooterTab from './FooterTab.jsx';
import PaymentMethod from './PaymentMethod.jsx';
import { getAllCategoryEndPoint } from '../../../API/api_request.js';
import { const_data } from '../../../CONST/const_data.js';
import { useDispatch } from 'react-redux';
import { productSearchAction } from '../../../redux/slice/ProductSearching.js';
import { Link, useNavigate } from 'react-router-dom';




function Footer() {

    let [categoryLink, setCategoryLink] = useState([]);
    let dispatch = useDispatch();
    let navigate= useNavigate()

    let useFulLinks = [
        {
            title: "About Us",
            link: "#about",
        },
        {
            title: "Featured Products",
            link: "#products",
        },
        {
            title: "Offers",
            link: "#offers",
        },
        {
            title: "Blog",
            link: "#blog",
        },
        {
            title: "FAQ",
            link: "#faq",
        },
        {
            title: "Careers",
            link: "#careers",
        },
        {
            title: "Contact Us",
            link: "#contact",
        },
    ]

    let contactList = [
        {
            title: "Customer Support",
            link: "mailto:customersupport@example.com",
        },
        {
            title: "Sales Department",
            link: "mailto:sales@example.com",
        },
        {
            title: "Technical Support",
            link: "mailto:techsupport@example.com",
        },
        {
            title: "General Inquiries",
            link: "mailto:info@example.com",
        },
        {
            title: "Marketing Department",
            link: "mailto:marketing@example.com",
        },
    ]


    useEffect(() => {
        getAllCategoryEndPoint().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let category = response?.categorys;
                setCategoryLink(category?.slice(0, 7))
            }
        }).catch((err) => { })
    }, []);


    function categoryNavigate(category_id) {
        dispatch(productSearchAction.setCategory({ category: [category_id] }))
        navigate("/product_searching")
    }

    return (
        <Fragment>
            <footer className="footer">
                <div className="footer-first-row ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <ul className="call-email-alt">
                                    <li><a href="#" className="callemail"><i className="uil uil-dialpad-alt"></i>1800-000-000</a></li>
                                    <li><a href="#" className="callemail"><i className="uil uil-envelope-alt"></i>info@gambosupermarket.com</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <SocialMediaLinks />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-second-row">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6 second-row-item"> 
                            <h4>Categories</h4>
                                <ul>
                                    {
                                        categoryLink.map(function (item) {
                                            return <li><a href="javascrit:;" onClick={() => categoryNavigate(item._id)}>{item.name}</a></li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <FooterTab title="Useful Links" link={useFulLinks}  ></FooterTab>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <FooterTab title="Contact us" link={contactList}  ></FooterTab>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">

                                <div className="second-row-item-payment">
                                    <h4>Payment Method</h4>
                                    <div className="footer-payments">
                                        <PaymentMethod />
                                    </div>
                                </div>
                                <div className="second-row-item-payment">
                                    <h4>Newsletter</h4>
                                    <div className="newsletter-input">
                                        <input id="email" name="email" type="text" placeholder="Email Address" className="form-control input-md" required="" />
                                        <button className="newsletter-btn hover-btn" type="submit"><i className="uil uil-telegram-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-last-row">
                    <div className="container">
                        <CopyRight />
                    </div>
                </div>
            </footer>








        </Fragment >
    )
}


// import '../../../UserAssets/js/jquery-3.3.1.min.js'


export default Footer
