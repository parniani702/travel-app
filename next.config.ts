/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {

    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ka3tior96x.ufs.sh', 'avatars.githubusercontent.com']
  }
};

module.exports = nextConfig;
