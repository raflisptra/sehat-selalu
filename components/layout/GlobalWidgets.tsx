"use client";

import { usePathname } from "next/navigation";
import BackToTop from "./BackToTop";
import ChatWidget from "./ChatWidget";
import Footer from "./Footer";

export default function GlobalWidgets() {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/register") {
        return null;
    }

    return (
        <>
            <Footer />
            <ChatWidget />
            <BackToTop />
        </>
    );
}
