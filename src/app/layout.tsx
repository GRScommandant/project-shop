"use client"
import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import {Direction} from "radix-ui";
import {Navbar} from "@/components/navbar/navbar"
import siteConfig from "@/config";


// export const metadata: Metadata = {
//     title: siteConfig.name,
//     description: siteConfig.description,
// };

export default function RootLayout({children}: Readonly<any>) {
    
    const dir = "rtl"
    return (
        <html lang="en" suppressHydrationWarning dir={dir}>
        <head/>
        <body>
        <Direction.Provider dir={dir}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar dir={dir}/>
                {children}
            </ThemeProvider>
        </Direction.Provider>
        </body>
        </html>
    )
}