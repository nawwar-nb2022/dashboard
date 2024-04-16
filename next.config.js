/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns : [{
            protocol : "https",
            hostname : "staging.emtc.ae"
        }]

        // domains: [`staging.emtc.ae`],
    },
};

module.exports = nextConfig;
