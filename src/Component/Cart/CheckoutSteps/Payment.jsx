import React, { Fragment } from 'react'
import { const_data } from '../../../CONST/const_data';
import { useSelector } from 'react-redux';

function Payment({ stateField, sub_total }) {


    let userData = useSelector((state) => state.userAuth.user)

    function onPaymentOptionChange(e) {
        stateField(e.target.value);
    }
    return (
        <Fragment>
            <div class="checkout-card" id="headingFour">
                <span class="checkout-step-number">3</span>
                <h4 class="checkout-step-title">
                    <button class="wizard-btn collapsed" type="button" data-toggle="collapse"
                        data-target="#collapseFour" aria-expanded="false"
                        aria-controls="collapseFour">Payment</button>
                </h4>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour"
                data-parent="#checkout_wizard">
                <div class="checkout-step-body">
                    <div class="payment_method-checkout">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="rpt100">
                                    <ul class="radio--group-inline-container_1">
                                        {
                                            Object.values(const_data.PAYMENT_METHOD).map((paymentMethodItem, index) => {
                                                let disabled = false;
                                                return (

                                                    <li>
                                                        <div class="radio-item_1">
                                                            <input onChange={onPaymentOptionChange} id={paymentMethodItem + "" + index} value={paymentMethodItem}
                                                                name="paymentmethod" type="radio"
                                                                disabled={
                                                                    paymentMethodItem === const_data.PAYMENT_METHOD.WALLET &&
                                                                    userData.wallet_amount < sub_total
                                                                }

                                                            />
                                                            <label for={paymentMethodItem + "" + index}
                                                                class="radio-label_1">{paymentMethodItem} {
                                                                    paymentMethodItem === const_data.PAYMENT_METHOD.WALLET &&
                                                                    userData.wallet_amount < sub_total ? <span className="text-danger">Influence Balance</span> :  null
                                                                }</label>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }

                                        {/* <li>
                                            <div class="radio-item_1">
                                                <input id="card1" disabled value="card" name="paymentmethod"
                                                    type="radio" data-minimum="50.0" />
                                                <label for="card1"
                                                    class="radio-label_1">RazorPay</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="radio-item_1">
                                                <input id="walletSystem" disabled value="wallet"
                                                    name="paymentmethod" type="radio"
                                                    data-minimum="50.0" />
                                                <label for="walletSystem" class="radio-label_1">
                                                    Wallet</label>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Payment
