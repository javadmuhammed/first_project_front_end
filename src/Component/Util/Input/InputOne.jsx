import React from 'react'

function InputOne({ name, type, placeholder, isRequired, icon, state, onChange, noicon=false,value="" }) {
    return (
        <div class="form-group pos_rel">
            <input value={value} onChange={(e) => { 
                onChange(e, state)
            }} name={name}   type={type} placeholder={placeholder} class={"form-control lgn_input" + (!noicon ? "" : " pl-3")}
                {...(isRequired ? { required: "required" } : {})}
            />
            {
                !noicon ? icon : ""
            }


        </div>
    )
}

export default InputOne
