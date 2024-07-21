import { createClient } from '@sanity/client';
import groq from 'groq';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProductProps } from '../../../../types/Products';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Link from 'next/link';
import QuantityAndButtons from '@/app/components/QuantityAndButtons';


type ParamsProps = {
    slug: string;
};


const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-07-17',
    token: process.env.NEXT_SANITY_SECRET_TOKEN
});


export async function generateStaticParams() {
    const products: ProductProps[] = await client.fetch(groq`*[_type == "product"]{ "slug": slug.current }`);
    return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
    const { slug } = params;
    const product = await client.fetch(groq`*[_type == "product" && slug.current == $slug][0]{
    name
  }`, { slug });

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return { title: product.name };
}

const ProductPage = async ({ params }: { params: ParamsProps }) => {
    const { slug } = params;
    const product = await client.fetch(groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url,
    category->{
      name
    }
  }`, { slug });

    if (!product) {
        notFound();
    };

    const recommend = await client.fetch(groq`*[_type == "product" && category->name == $category && slug.current != $slug][0..6]{
        _id,
        name,
        "slug": slug.current,
        description,
        price,
        "imageUrl": image.asset->url,
        category->{
          name
        }
      }`, { category: product.category.name, slug });

    if (!recommend) {
        notFound();
    };



    return (
        <div className='md:px-32'>
            <div className="product-detail-container justify-center gap-10 md:gap-14">
                <div className=''>
                    <Image src={product.imageUrl ?? product.imageUrl[0]} alt={product.name} width={640} height={600} className='h-70 w-[20rem] rounded-lg shadow-xl' />
                </div>
                {/* <div className="small-images-container">
                    {product.imageUrl?.map(({item, index}:) => (
                        <Image 
                        src={urlFor(item)} 
                        height={300} width={450}
                        alt={item.name}
                        className=""
                        />
                    ))}
                </div> */}
                <div className="product-detail-desc">
                    <div className='flex justify-between items-center py-4 text-lg'>
                        <h1>{product.name}</h1>
                        <div className="reviews flex items-center justify-center gap-2 text-red-600">
                            <div className='flex'>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiOutlineStar />
                            </div>
                            <p>(57)</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-slate-500 text-sm'>Category: {product.category.name}</p>
                        <p>{product.description}</p>
                        <p className='text-green-700 text-xl'>R{product.price}</p>
                        {/* TODO: make this quantity a separate component and import it here*/}
                        <QuantityAndButtons product={{ ...product }} />
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="track maylike-products-container">
                        {recommend.map((item: ProductProps) => (
                            <RecommendationCard
                                key={item._id}
                                imageUrl={item.imageUrl}
                                name={item.name}
                                price={item.price}
                                category={item.category}
                                description={item.description}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecommendationCard = (product: ProductProps) => {
    return (
        <div className="py-4 my-3 flex flex-col items-start">
            <div className=' p-4 h-60 w-64 md:w-72 md:h-64'>
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={product.imageUrl ?? product.imageUrl[0]}
                        alt="product image"
                        width={640}
                        height={600}
                        className='h-52 w-56 rounded-md'
                    />
                    {product.name}
                    <div className='flex gap-4'>
                        <div>
                            R{product.price}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}


export default ProductPage;
