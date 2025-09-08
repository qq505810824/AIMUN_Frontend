/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

    webpack: (config) => {
        // load worker files as a urls with `file-loader`
        config.module.rules.unshift({
            test: /pdf.worker\.(min\.)?js/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        publicPath: '_next/static/worker',
                        outputPath: 'static/worker'
                    }
                }
            ]
        });

        return config;
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'images.unsplash.com',
    //         },
    //     ],
    // },
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/',
    //             permanent: false,
    //         },
    //     ]
    // },
};

export default nextConfig;
