import Layout from "@/components/Layout";
import { Toaster } from "sonner";
import { SessionProvider, useSession } from "next-auth/react";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import EditModal from "@/components/modals/EditModal";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import localFont from "next/font/local";
import Head from "next/head";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ClipLoader } from "react-spinners";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "ad036bdc0012f46a149ceacac0dfcfff";

const { wallets } = getDefaultWallets({
  appName: "GamePayy",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "GamePayy",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const clash = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Extralight.woff",
      weight: "200",
      style: "extralight",
    },
    {
      path: "../public/fonts/ClashDisplay-Light.woff",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/ClashDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.woff",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.woff",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>GamePayy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
          <main className={`${clash.variable} font-sans`}>
            <Toaster richColors />
            <LoginModal />
            <RegisterModal />
            <EditModal />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
}
