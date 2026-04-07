import GlobalWidgets from "@/components/layout/GlobalWidgets";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Selalu Sehat - Platform Kesehatan Digital Indonesia",
    description: "Platform kesehatan digital Indonesia dengan GenomID, HerbalSainsID, BeMyEye, dan SimDoc",
    icons: {
    icon: "/logo.png",
},
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="flex flex-col min-h-screen bg-[#f5f7fb]">
                {children}
                <GlobalWidgets />
            </body>
        </html>
    );
}
