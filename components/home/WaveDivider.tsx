import { useEffect, useState } from "react";

interface WaveDividerProps {
    topColor?: string;
    bottomColor?: string;
    flip?: boolean;
    className?: string;
}

export default function WaveDivider({
    topColor = "#f5f7fb",
    bottomColor = "#ffffff",
    flip = false,
    className = "",
    height = 90,
}: WaveDividerProps & { height?: number }) {
    const rectColor = flip ? bottomColor : topColor;
    const pathColor = flip ? topColor : bottomColor;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const desktopPath = `M0,${height * 0.2} C400,${height * 0.9} 1000,${height * 0.1} 1440,${height * 0.2} V${height} H0 Z`;
    
    const mobilePath = `M0,${height * 0.4} C400,${height * 0.7} 1000,${height * 0.3} 1440,${height * 0.4} V${height} H0 Z`;

    return (
        <div
            className={`wave-divider pointer-events-none ${className}`}
            style={{
                transform: flip ? "scaleY(-1)" : undefined,
            }}
        >
            <svg
                viewBox={`0 0 1440 ${height}`}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ display: "block", width: "100%", height: `${height}px` }}
                shapeRendering="geometricPrecision"
            >
                {rectColor !== "transparent" && (
                    <rect width="1440" height={height} fill={rectColor} stroke="none" />
                )}
                <path
                    d={isMobile ? mobilePath : desktopPath}
                    fill={pathColor}
                    stroke="none"
                />
            </svg>
        </div>
    );
}
