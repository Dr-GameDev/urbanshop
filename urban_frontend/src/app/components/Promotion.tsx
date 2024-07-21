import React from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/client";


const Promotion = async () => {
	const products = await getProducts();

	return (
		<section className="bg-gray-100 py-20">
			<div className="flex justify-between px-8">
				<h1 className="mb-5">Best sellers this week</h1>
				<p>
					<Link href="/store/">
						{/* Get context (useStateContext) to actually load items on promotion */}
						View All
					</Link>
				</p>
			</div>
			<div className="product-container flex gap-3">
				{products.map((product) => (
					<ProductCard
						key={product._id}
						name={product.name}
						price={product.price}
						slug={product.slug}
						description={product.description}
						imageUrl={product.imageUrl}
						category={product.category}
					/>
				))}
			</div>
		</section>
	);
};

export default Promotion;
