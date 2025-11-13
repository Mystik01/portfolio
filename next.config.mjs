import mdx from "@next/mdx";
import { withBotId } from 'botid/next/config';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */


const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};



export default async (phase, { defaultConfig }) => {
  // ⚠️ CRITICAL CORRECTION: Use the imported constant, not the hardcoded string
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Use dynamic import for dotenv
    const dotenv = await import('dotenv');
    // ⚠️ Check your path: './.env.env.local' looks like a typo, should be './.env.local'
    dotenv.config({ path: './.env.local' }); 
  }

  // Apply all wrappers
  return withBotId(withMDX(nextConfig));
};