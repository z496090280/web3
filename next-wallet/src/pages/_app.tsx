/*
 * @Author: lee
 * @Date: 2023-05-28 19:43:26
 * @LastEditTime: 2023-05-30 21:06:38
 */
import "@/assets/styles/global.css";
import React, { useState } from "react";
export default function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
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
