import React from 'react'
import { const_data } from '../../CONST/const_data'

function OrderTracking({ currentStatus, shippingHistory }) {

    let isActive = false;
    let classStatus = "complete";
    let closedOrderStatus = [const_data.ORDER_STATUS.CANCELED, const_data.ORDER_STATUS.RETURNED, const_data.ORDER_STATUS.RETURNED_REQUEST, const_data.ORDER_STATUS.REFUND]
     
    console.log(shippingHistory)
    return (
        <div class="track-order pt-0">
            
            
            <div class="bs-wizard pt-4" style={{ borderBottom: 0 }}>
                {

                    closedOrderStatus.includes(currentStatus) ? (
                        
                        shippingHistory.map((eachStatus) => {
                            return <div class={"bs-wizard-step complete"}>
                                <div class="text-center bs-wizard-stepnum">{eachStatus?.status}</div>
                                <div class="progress"><div class="progress-bar"></div></div>
                                <a href="#" class="bs-wizard-dot"></a>
                            </div>
                        })
                    ) : Object.values(const_data.ORDER_STATUS_DISPLAY).map((eachStatus) => {

                        if (!isActive) classStatus = (currentStatus == eachStatus ? "active" : "complete");

                        let widget = (<div class={"bs-wizard-step " + classStatus}>

                            <div class="text-center bs-wizard-stepnum">{eachStatus}</div>
                            <div class="progress"><div class="progress-bar"></div></div>
                            <a href="#" class="bs-wizard-dot"></a>
                        </div>)

                        if (classStatus == "active") {
                            isActive = true
                            classStatus = "disabled";
                        }

                        return widget;

                    })
                }
                {/* {
                    !const_data.ORDER_STATUS_DISPLAY[currentStatus] ? (
                        <div class={"bs-wizard-step " + "active"}>
                            <div class="text-center bs-wizard-stepnum">{currentStatus}</div>
                            <div class="progress"><div class="progress-bar"></div></div>
                            <a href="#" class="bs-wizard-dot"></a>
                        </div>
                    ) : null
                } */}

            </div>
        </div>
    )
}

export default OrderTracking
