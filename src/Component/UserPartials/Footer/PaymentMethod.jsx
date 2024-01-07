import React, { Fragment } from 'react'
import payIcon1 from '../../../assets/images/footer-icons/pyicon-1.svg'
import payIcon6 from '../../../assets/images/footer-icons/pyicon-6.svg'
import masterCard from '../../../assets/images/footer-icons/pyicon-2.svg'
import americanExpress from '../../../assets/images/footer-icons/pyicon-3.svg'
import discover from '../../../assets/images/footer-icons/pyicon-4.svg'


function PaymentMethod(props) {
    return (
        <Fragment>
            <ul id={props.key} className="financial-institutes">
                <li className="financial-institutes__logo">
                    <img alt="Visa" title="Visa" src={payIcon6} />
                </li>
                <li className="financial-institutes__logo">
                    <img alt="Visa" title="Visa" src={payIcon1} />
                </li>
                <li className="financial-institutes__logo">
                    <img alt="MasterCard" title="MasterCard" src={masterCard} />
                </li>
                <li className="financial-institutes__logo">
                    <img alt="American Express" title="American Express" src={americanExpress} />
                </li>
                <li className="financial-institutes__logo">
                    <img alt="Discover" title="Discover" src={discover} />
                </li>
            </ul>
        </Fragment>
    )
}

export default PaymentMethod
