import React from "react";
import './mainButton.css';

export const Button =(props)=>{
    return(
        <button {...props} className ={'button'+ props.className}/>
    );
}