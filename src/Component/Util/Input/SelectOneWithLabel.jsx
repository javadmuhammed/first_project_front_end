import React, { Fragment } from 'react'

function SelectOneWithLabel({ label, name, isRequired, state, onChange, options, selected }) {
    return (
        <Fragment>
            <label htmlFor="">{label}</label>
            <div class="form-group pos_rel">

                <select onChange={(e) => { onChange(e, state) }} name={name}  class="ui fluid search dropdown form-dropdown" {...(isRequired ? { required: "required" } : {})}>
                    {
                        options?.map((opt) => {
                            return <option value={opt.value}>{opt.name}</option>
                        })
                    }
                </select>

            </div>
        </Fragment>
    )
}

export default SelectOneWithLabel
