import React from 'react';
import Link from "next/link";
import { ProductProps } from '../../../types/Products';
import Image from 'next/image';


const ProductCard = (product: ProductProps) => {
    return (
        <div className="product-item bg-gray-200 py-12 my-3 flex flex-col items-start">
            <div className=' p-4 h-60 w-64 md:w-72 md:h-64'>
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={product.imageUrl ?? product.imageUrl[0]}
                        alt="product image"
                        width={640}
                        height={600}
                        className='h-52 w-56'
                    />
                    {product.name}
                    <div className='flex gap-4'>
                        <div>
                            R{product.price}
                        </div>
                        <div className='text-red-500 line-through'>
                            R{product.price + (product.price * 25 / 100)}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductCard