"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const observer = new MutationObserver(() => {
            const isChatOpen = document.body.classList.contains("chat-widget-open");
            const isMapFS = document.body.classList.contains("map-fullscreen-open");
            setIsWidgetOpen(isChatOpen || isMapFS);
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            observer.disconnect();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (!isVisible || isWidgetOpen) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="fixed bottom-[90px] right-5 z-[9997] w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
        >
            <ArrowUp size={24} strokeWidth={2.5} />
        </button>
    );
}
