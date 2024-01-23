import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Component/UserPartials/UserLayout/UserLayout'
import { getCoupenCode } from '../../../API/api_request';
import { const_data } from '../../../CONST/const_data';
import { getValidDateFormat } from '../../../helper/HelperFunction';
import EmptyScreen from '../../../Component/Util/Box/EmptyScreen';

function Coupens() {


    let [coupens, setCoupens] = useState([]);

    useEffect(() => {
        getCoupenCode().then((data) => {
            let response = data?.data;
            if (response?.status) {
                setCoupens(response.coupens)
                console.log(response)
            }
        }).catch((err) => { })
    }, [])


    return (
        <UserLayout>
            <div class="container">
                <div className="row">
                    {
                        coupens?.length < 0 ? (
                            <div className="mt-2 w-100">
                                <EmptyScreen bgColor={"white"} content={"Explore more for coupen code"} title={"Wait for your turn"}></EmptyScreen>
                            </div>
                        ) : (
                            coupens?.map((item) => {
                                return <div className="col-md-3">
                                    <div class="pdpt-bg rewards-coupns">
                                        <div class="reward-body-dtt">
                                            <div class="reward-img-icon">
                                                <img src="assets/images/coupon.svg" alt="" />
                                            </div>
                                            <span class="rewrd-title">{
                                                item?.is_percentage ? item?.offer + "% Flat discount" : item?.offer + const_data.CURRENCY_ICON + " Flat discount"
                                            }</span>
                                            <h4 class="cashbk-price">Code : {item?.code}</h4>
                                            <span class="date-reward">Expires on : {getValidDateFormat(item?.valid_to)}</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        )
                    }

                </div>
            </div>
        </UserLayout>
    )
}

export default Coupens