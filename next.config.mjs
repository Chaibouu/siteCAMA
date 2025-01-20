/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns : [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "assets.res.cloudinary.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**"
            },
        ]
    }
};

export default nextConfig;
