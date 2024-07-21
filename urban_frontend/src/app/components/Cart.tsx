"use client";
import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import { useStateContext } from '@/context/StateContext';
import { ProductProps } from '../../../types/Products';
import Image from 'next/image';



const Cart = () => {
    const cartRef = useRef(null);
    const { cartItems, toggleCartItemQuantity, onRemove } = useStateContext();


    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                {cartItems.length < 1 ? (
                    <div className="empty-cart flex flex-col items-center">
                        <AiOutlineShoppingCart size={150} />
                        <h3>Your shopping bag is empty</h3>
                    </div>
                ) : (<div className="flex flex-col justify-evenly px-2">
                    {cartItems.map((cartItem: ProductProps) => (
                        <div key={cartItem._id} className='flex items-center justify-between gap-8 md:gap-20'>
                            <div>
                                <Image className='rounded-sm' src={cartItem.imageUrl} alt="product image" height={45} width={50} />
                            </div>
                            <div className='hidden md:flex'>{cartItem.name}</div>
                            <div className="flex justify-start items-center gap-2 md:gap-4 ">
                                <button className="p-4 border rounded-lg cursor-pointer" onClick={() => toggleCartItemQuantity(cartItem._id, "decrease")}>
                                    <AiOutlineMinus />
                                </button>
                                <span className="text-lg p-1">
                                    {cartItem.quantity}
                                </span>
                                <button className="p-4 border rounded-lg cursor-pointer" onClick={() => toggleCartItemQuantity(cartItem._id, "increase")}>
                                    <AiOutlinePlus />
                                </button>
                            </div>
                            {/* @ts-expect-error: Object is possibly 'undefined' */}
                            <div>R{cartItem.price * cartItem.quantity}</div>
                            <button
                                type="button"
                                className="remove-item"
                                onClick={() => onRemove(cartItem._id)}
                            >
                                <TiDeleteOutline />
                            </button>
                        </div>
                    ))}
                </div>)}




            </div>
        </div>
    )
}


export default Cart;