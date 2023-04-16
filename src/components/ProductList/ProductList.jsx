import React from "react";
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from '../../hooks/useTelegram'
import { useCallback, useEffect, useState} from "react";
const products = [
{id: '1' , title: 'аркана на пуджа',  price: 1700, description:'', img: 'https://cybersport.metaratings.ru/upload/iblock/ace/ace5eeedb671c71f57ced00294a7acf1.jpg'}, 
{id: '2' , title: 'рапира',  price: 1700, description:'', img: 'https://dota2ok.ru/wp-content/uploads/2021/09/05.png779a5b48-b70a-4108-9e3c-409748c96b11Large.jpg'}, 
{id: '3' , title: 'мипоооо',  price: 1700, description:'', img: 'https://yt3.googleusercontent.com/Iwx27OubyxdtNV10fuwKYQaiF9ZVb2Qu2L3u6H3ERIzyrcHAd69tWGbfPLDgyOOKq35zJ0k_=s900-c-k-c0x00ffffff-no-rj'}, 
{id: '4' , title: 'аркана на сфа',  price: 1700, description:'', img: 'https://kopiberi.ru/uploads/images/feature_image/cosmetic-icon-demon-eater.png'}, 
{id: '5' , title: 'арк',  price: 1700, description:'', img: 'https://i.pinimg.com/originals/a1/b1/64/a1b1640216942c4eee8e47ee957cd60b.jpg'}, 
 
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
