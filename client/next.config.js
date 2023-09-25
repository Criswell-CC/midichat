/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: { 
        SERVER_URL: process.env.SERVER_URL,
        SOCKET_URL: process.env.SOCKET_URL,
        DEBUG: process.env.debug
    }
}

module.exports = nextConfig
