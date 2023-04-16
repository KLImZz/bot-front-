import React from "react";
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from '../../hooks/useTelegram'
import { useCallback, useEffect, useState} from "react";
const products = [
{id: '1' , title: 'аркана на пуджа',  price: 1700, description:'', img: 'https://yt3.googleusercontent.com/Iwx27OubyxdtNV10fuwKYQaiF9ZVb2Qu2L3u6H3ERIzyrcHAd69tWGbfPLDgyOOKq35zJ0k_=s900-c-k-c0x00ffffff-no-rj'}, 
{id: '2' , title: 'аркана на пуджа',  price: 1700, description:'', img: 'https://yt3.googleusercontent.com/Iwx27OubyxdtNV10fuwKYQaiF9ZVb2Qu2L3u6H3ERIzyrcHAd69tWGbfPLDgyOOKq35zJ0k_=s900-c-k-c0x00ffffff-no-rj'}, 
{id: '3' , title: 'аркана на пуджа',  price: 1700, description:'', img: 'https://yt3.googleusercontent.com/Iwx27OubyxdtNV10fuwKYQaiF9ZVb2Qu2L3u6H3ERIzyrcHAd69tWGbfPLDgyOOKq35zJ0k_=s900-c-k-c0x00ffffff-no-rj'}, 
{id: '4' , title: 'аркана на пуджа',  price: 1700, description:'', img: 'https://yt3.googleusercontent.com/Iwx27OubyxdtNV10fuwKYQaiF9ZVb2Qu2L3u6H3ERIzyrcHAd69tWGbfPLDgyOOKq35zJ0k_=s900-c-k-c0x00ffffff-no-rj'}, 
{id: '5' , title: 'аркана на пуджа',  price: 1700, description:'', img: 'https://yt3.googleusercontent.com/Iwx27OubyxdtNV10fuwKYQaiF9ZVb2Qu2L3u6H3ERIzyrcHAd69tWGbfPLDgyOOKq35zJ0k_=s900-c-k-c0x00ffffff-no-rj'}, 
 
]

export const ProductList = () =>{
    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
            tg.onClose()
        }
    }
    const getTotalPrice = (items = []) => {
        return items.reduce((acc,item) => {
            return acc += item.price
        }, 0)
    }
    return(
        
        <div className={'list'}>
        {products.map(item => (
            <ProductItem
            product={item}
            onAdd={onAdd}
            className={'item'}
            />
        ))}
        
        </div>
    );
};
