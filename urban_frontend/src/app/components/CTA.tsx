"use client";
import React from 'react';
import Image from 'next/image';
import styles from './CTA.module.css'; // Import CSS module for styling

const CTA = () => {

    return (
        <div className={styles.ctaContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src="/images/shoe-ad.png"
                    alt="Stylish Shoe"
                    layout="fill"
                    objectFit="contain"
                    className={styles.shoeImage}
                />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>Step Up Your Game!</h1>
                <p className={styles.subheading}>Discover the latest in style and comfort with our new range of shoes.</p>
                <button className={styles.ctaButton}><a href="/store">Shop Now</a></button>
            </div>
        </div>
    );
};

export default CTA;
