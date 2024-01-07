import React, { Fragment, useRef } from 'react'

function InputWithIconButton({ placeHolder, icon, OnClick }) {

    let inputRef = useRef();

    return (
        <div className="ui search">
            <div className="ui right icon input swdh10">
                <input ref={inputRef} className="prompt srch10" type="text" placeholder={placeHolder} />
                <i type="button" onClick={() => OnClick(inputRef.current.value)} style={{ backgroundColor: "#f55d2c", pointerEvents: "unset", cursor: "pointer" }} className={'uil uil-' + icon + ' icon icon1'}></i>
            </div>
        </div>
    )
}

export default InputWithIconButton