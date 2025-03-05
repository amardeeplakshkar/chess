'use client'
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TelegramProvider } from "./TelegramData";
import {Toaster} from "react-hot-toast";
import dynamic from "next/dynamic";

const LoaderProviderNoSSR = dynamic(() => import("./LoaderProvider"), {
  ssr: false,
});

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <TelegramProvider>
            <Toaster containerStyle={{
                fontSize: "0.8rem",
            }} position="top-center" reverseOrder={false} />             
            <TonConnectUIProvider manifestUrl="https://tonconnect.github.io/tonconnect-example-dapp/manifest.json">
                <div className="relative -z-50" id="stars2"></div>
                <div className="relative -z-50" id="stars3"></div>
                <div className="relative -z-50" id="stars"></div>
                <LoaderProviderNoSSR>
                {children}
                </LoaderProviderNoSSR>
            </TonConnectUIProvider>
        </TelegramProvider>
    )
}