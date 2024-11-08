/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'standalone',
	images: {
		// Using wildcard hostname due to app being pre-built with Docker before any environment
		// variables exist per client, so they can't be passed here to allow only client's domain
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

