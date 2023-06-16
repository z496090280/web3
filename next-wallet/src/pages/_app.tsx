/*
 * @Author: lee
 * @Date: 2023-05-28 19:43:26
 * @LastEditTime: 2023-06-02 11:43:34
 */
import { WagmiConfig, mainnet, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { createPublicClient, http } from "viem";
import "@/assets/styles/global.css";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
//rainbow kit UI framework.
import "@/app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

// import "@/assets/styles/global.css";
// import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
// import { useState } from "react";

// interface IAppProps {
//   Component: any;
//   pageProps: any;
// }
// export default function App({ Component, pageProps }: IAppProps) {
//   const { chains, publicClient, webSocketPublicClient } = configureChains(
//     [mainnet],
//     [publicProvider()]
//   );
//   const config = createConfig({
//     autoConnect: true,
//     publicClient,
//     webSocketPublicClient,
//   });
//   return (
//     <WagmiConfig config={config}>
//       <Component {...pageProps} />
//     </WagmiConfig>
//   );
// }
