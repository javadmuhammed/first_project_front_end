
import React, { Fragment } from 'react'


import SocialMediaLinks from './SocialMediaLinks.jsx';
import CopyRight from './CopyRight.jsx';
import FooterTab from './FooterTab.jsx';
import PaymentMethod from './PaymentMethod.jsx';



let categoryLink = [
    {
        title: "Fruits and Vegetables",
        link: "#",
    },
    {
        title: "Grocery & Staples",
        link: "#",
    },
    {
        title: "Dairy & Eggs",
        link: "#",
    },
    {
        title: "Beverages",
        link: "#",
    },
    {
        title: "Snacks",
        link: "#",
    },
    {
        title: "Home Care",
        link: "#",
    },
    {
        title: "Noodles & Sauces",
        link: "#",
    },
    {
        title: "Personal Care",
        link: "#",
    },
    {
        title: "Pet Care",
        link: "#",
    },
    {
        title: "Meat & Seafood",
        link: "#",
    },
    {
        title: "Electronics",
        link: "#",
    },
]

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

function Footer() {
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
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <FooterTab title="Categories" link={categoryLink}  ></FooterTab>
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
