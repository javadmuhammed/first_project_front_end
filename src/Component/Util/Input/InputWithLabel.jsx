import React, { Fragment } from 'react'

function InputWithLabel({ label, name, type, placeholder, isRequired, icon, state, onChange, value }) {
    return (
        <Fragment>
            <label htmlFor="">{label}</label>
            <div class="form-group pos_rel">

                <input value={value == "" ? "" : value} onChange={(e) => {
                    onChange(e, state)
                }} name={name} type={type} placeholder={placeholder} class="form-control lgn_input"
                    {...(isRequired ? { required: "required" } : {})}
                />
                {icon}

            </div>
        </Fragment>
    )
}

export default InputWithLabel
