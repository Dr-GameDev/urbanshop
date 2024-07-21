import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductProps } from '../../../types/Products';
import { getApparelProducts, getCampingProducts, getGadgetProducts } from '@/lib/client';

const Page = async () => {
    const apparels = await getApparelProducts();
    const camping = await getCampingProducts();
    const gadgets = await getGadgetProducts();

    return (
        <section>
            <div className='flex flex-col w-screen h-full px-10 py-5'>
                <div id='apparels'>
                    <h1 className='pl-4 text-xl capitalize'>Apparel</h1>
                    <div className='flex flex-wrap'>
                        {apparels.map((apparel) => (
                            <ProductCard
                                key={apparel._id}
                                name={apparel.name}
                                slug={apparel.slug}
                                description={apparel.description}
                                imageUrl={apparel.imageUrl}
                                price={apparel.price}
                                category={apparel.category}
                            />
                        ))}
                    </div>
                </div>
                <div id='camping'>
                    <h1 className='pl-4 text-lg capitalize'>Camping and hiking gear</h1>
                    <div className='flex flex-wrap'>
                        {camping.map((camp) => (
                            <ProductCard
                                key={camp._id}
                                name={camp.name}
                                slug={camp.slug}
                                description={camp.description}
                                imageUrl={camp.imageUrl}
                                price={camp.price}
                                category={camp.category}
                            />
                        ))}
                    </div>
                </div>
                {/* <div id="gadgets">
                    <h1>Gadgets</h1>
                    <div className="flex flex-wrap">
                        {gadgets.map((gadget) => (
                            <ProductCard
                                key={gadget._id}
                                name={gadget.name}
                                slug={gadget.slug}
                                description={gadget.description}
                                imageUrl={gadget.imageUrl}
                                price={gadget.price}
                                category={gadget.category}
                            />
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    );
};

const ProductCard = (product: ProductProps) => {
    return (
        <div className=" py-12 my-3 flex flex-col items-start">
            <div className='p-4 h-60 w-64 md:w-72 md:h-64'>
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={product.imageUrl || '/placeholder.png'}
                        alt={product.name}
                        width={640}
                        height={600}
                        className='h-52 w-56'
                    />
                    <div>{product.name}</div>
                    <div className='flex gap-4'>
                        <div>R{product.price}</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Page;
