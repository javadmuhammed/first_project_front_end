import React, { Fragment, useState } from 'react'
import { const_data } from '../../../CONST/const_data';

function DeliveryTime({ stateField }) {



    let [selectedTimeSloat, setSelectedTimeSloat] = useState();
 
    const handleRadioChange = (event) => {
        const selectedId = event.target.value;
        setSelectedTimeSloat(selectedId); 
        stateField(selectedId); 
    };

    return (
        <Fragment>
            <div class="checkout-card" id="headingThree">
                <span class="checkout-step-number">2</span>
                <h4 class="checkout-step-title">
                    <button class="wizard-btn collapsed" type="button" data-toggle="collapse"
                        data-target="#collapseThree" aria-expanded="false"
                        aria-controls="collapseThree"> Delivery Time & Date </button>
                </h4>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                data-parent="#checkout_wizard">
                <div class="checkout-step-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Select Date and Time*</label>

                                <div class="time-radio">
                                    <div class="ui form">
                                        <div class="grouped fields">
                                            {
                                                const_data.DELIVERY_TIME_SLOAT.map((deliveryTime) => {
                                                    return (
                                                        <div class="field">
                                                            <div class="ui radio checkbox chck-rdio">
                                                                <input onChange={handleRadioChange} checked={selectedTimeSloat === deliveryTime} value={deliveryTime} type="radio" name="delivery_time" />
                                                                <label>{deliveryTime}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            } 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="collapsed next-btn16 hover-btn" role="button" data-toggle="collapse"
                        href="#collapseFour"> Proccess to payment </a>
                </div>
            </div>
        </Fragment>
    )
}

export default DeliveryTime
