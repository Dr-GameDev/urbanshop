import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import { ProductProps } from "../../types/Products";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-07-17',
  token: process.env.NEXT_SANITY_SECRET_TOKEN
});

export const urlFor = (source: ProductProps) => createImageUrlBuilder(client).image(source).url();

export async function getProducts(): Promise<ProductProps[]> {
  try {
    return await client.fetch(groq`*[_type == "product"] | order(name desc) [0...6]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      "imageUrl": image.asset->url,
      category->{
        name
      }
    }`);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getApparelProducts(): Promise<ProductProps[]> {
  try {
    return await client.fetch(groq`*[_type == "product" && (category->name == "apparel" || category->name == "Apparel")]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      "imageUrl": image.asset->url,
      category->{
        name
      }
    }`);
  } catch (error) {
    console.error("Error fetching apparel products:", error);
    return [];
  }
}

export async function getCampingProducts(): Promise<ProductProps[]> {
  try {
    return await client.fetch(groq`*[_type == "product" && (category->name == "camping" || category->name == "Camping")]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      "imageUrl": image.asset->url,
      category->{
        name
      }
    }`);
  } catch (error) {
    console.error("Error fetching camping products:", error);
    return [];
  }
}

export async function getGadgetProducts(): Promise<ProductProps[]> {
  try {
    return await client.fetch(groq`*[_type == "product" && (category->name == "gadget" || category->name == "Gadget")]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      "imageUrl": image.asset->url,
      category->{
        name
      }
    }`);
  } catch (error) {
    console.error("Error fetching gadget products:", error);
    return [];
  }
}
