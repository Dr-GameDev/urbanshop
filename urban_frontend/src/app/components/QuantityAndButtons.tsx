"use client";
import React from 'react'
import { ProductProps } from '../../../types/Products'
import { useStateContext } from '@/context/StateContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const QuantityAndButtons = ({ product }: { product: ProductProps }) => {
    const { decreaseQty, qty, increaseQty, onAdd } = useStateContext();

    return (
        <div>
            <div className="flex items-center gap-4">
                <h3>Quantity:</h3>
                <p className="flex justify-start items-center gap-4 ">
                    <button className="p-4 border rounded-lg cursor-pointer" onClick={decreaseQty}>
                        <AiOutlineMinus />
                    </button>
                    <span className="text-lg p-1">
                        {qty}
                    </span>
                    <button className="p-4 border rounded-lg cursor-pointer" onClick={increaseQty}>
                        <AiOutlinePlus />
                    </button>
                </p>
            </div>

            <div className='buttons'>
                <button type="button" className='add-to-cart' onClick={() => {
                    onAdd(product, qty)
                    console.log(product)
                }}>Add to cart</button>

            </div>
        </div>
    )
}

export default QuantityAndButtons