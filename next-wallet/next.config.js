/*
 * @Author: lee
 * @Date: 2023-05-08 18:08:15
 * @LastEditTime: 2023-06-01 23:36:57
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
}

module.exports = nextConfig
