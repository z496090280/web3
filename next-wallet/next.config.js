/*
 * @Author: lee
 * @Date: 2023-05-08 18:08:15
 * @LastEditTime: 2023-06-02 11:36:33
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
    appDir: false,
  },
}

module.exports = nextConfig
