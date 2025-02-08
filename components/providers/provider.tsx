'use client'
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TelegramProvider } from "./TelegramData";

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <TelegramProvider>
            <TonConnectUIProvider manifestUrl="https://tonconnect.github.io/tonconnect-example-dapp/manifest.json">
                <div className="relative -z-50" id="stars2"></div>
                <div className="relative -z-50" id="stars3"></div>
                <div className="relative -z-50" id="stars"></div>
                {children}
            </TonConnectUIProvider>
        </TelegramProvider>
    )
}