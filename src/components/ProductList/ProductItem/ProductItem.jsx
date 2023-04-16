import React from "react";
import './ProductItem.css';

export const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product)
    }
    return (
        <div>  
            <div className={'product ' + className}>
            </div>
            <div className={'img'}  ><img className ='photo' src = {product.img}/> </div>
            <div className={"title"}>{product.title}</div>
            <div className={"description"}>{product.description}</div>
            <div className={"price"}></div>
            <button className={"add-btn"} onClick={onAddHandler}>
                Добавить в корзину 
            </button>
        </div>
    )
}
