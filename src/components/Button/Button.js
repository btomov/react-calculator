import React from 'react'
import './Button.css'
const Button = props =>{
    return <div className={`btn + ${props.specialClass}`} onClick={props.onClick} data-type={props.type} data-value={props.value}>{props.placeholder}</div>
}

export default Button;