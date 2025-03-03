import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/providers/provider";
import Dock from "@/components/Dock";
import LoaderProvider from "@/components/providers/LoaderProvider";


export const metadata: Metadata = {
  title: "Checkpoint",
  description: "Last Telegram AirDrop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased overflow-hidden`}
      >
        <Provider>
          <LoaderProvider>
          <div className="h-[98dvh] flex flex-col">
            <div className="flex-1">
            {children}
            </div>
            <Dock/>
          </div>
          </LoaderProvider>
        </Provider>
      </body>
    </html>
  );
}
