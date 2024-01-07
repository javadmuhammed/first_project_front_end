import React, { useState } from 'react'
import InputOne from '../Util/Input/InputOne';
import InputWithIconButton from '../Util/Input/InputWithIconButton';
import { applyCoupenCode } from '../../API/api_request';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchCartDetails } from '../../redux/slice/CartItems';

function CoupenCodeApply({ invoice_id, onSubmit }) {

    let [isToggleOpen, setToggleOpen] = useState(false);
    let [coupenCode, setCoupenCode] = useState(null);
    let dispatch = useDispatch();

    function toggleApplayCoupen() {
        setToggleOpen(!isToggleOpen)
    }

    function onCoupenSubmit(coupen_code) {

        applyCoupenCode(coupen_code, invoice_id).then(async (coupen_status) => {
            let response = coupen_status?.data;
            let msg = response?.coupen_status?.msg ?? "Something went wrong";
            console.log(response)

            if (response?.status) {
                if (response?.coupen_status?.status) {
                    toast.success(msg)
                    // dispatch(await fetchCartDetails());
                    onSubmit();
                    return
                }
            }
            return toast.error(msg)
        })
    }

    return (
        <div>
            <button class="w-100 promo-link45" onClick={toggleApplayCoupen}>Have a promocode?</button>
            {
                isToggleOpen ? <div className="bg-white pl-3 pr-3 pb-3" >
                    <InputWithIconButton OnClick={onCoupenSubmit} icon={"check"} placeHolder={"Enter coupen code"}></InputWithIconButton>
                </div> : null
            }

        </div>
    )
}

export default CoupenCodeApply