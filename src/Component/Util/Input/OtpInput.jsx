import React from 'react'

function OtpInput(props) {
    return (
        <ul class="code-alrt-inputs signup-code-list">
            {
                props.otp_item?.input_data.map((item) => {
                    return (
                        <li>
                            <input onChange={(e) => {
                                props.state((prev) => prev + "" + e.target.value)
                            }} id={item.id} name={item.name} type={item.type} class="form-control input-md" required />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default OtpInput
