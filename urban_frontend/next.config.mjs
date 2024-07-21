/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_SANITY_SECRET_TOKEN: process.env.NEXT_SANITY_SECRET_TOKEN,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
            },
        ],
    },
};

export default nextConfig;
