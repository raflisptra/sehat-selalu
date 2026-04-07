"use client";
import "leaflet/dist/leaflet.css";
import { Activity, Biohazard, Shield, TrendingUp, Skull } from "lucide-react";
import { useEffect, useState } from "react";
import { Circle, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

export const outbreakData = [
    { lat: -6.2, lng: 106.8, disease: "DBD", level: "high", city: "Jakarta", cases: 234, recovered: 180, deaths: 12 },
    { lat: -7.25, lng: 112.75, disease: "ISPA", level: "high", city: "Surabaya", cases: 412, recovered: 290, deaths: 8 },
    { lat: -6.9, lng: 107.6, disease: "Tifus", level: "medium", city: "Bandung", cases: 89, recovered: 70, deaths: 3 },
    { lat: 3.58, lng: 98.67, disease: "Malaria", level: "medium", city: "Medan", cases: 156, recovered: 110, deaths: 6 },
    { lat: -5.14, lng: 119.43, disease: "DBD", level: "low", city: "Makassar", cases: 43, recovered: 40, deaths: 1 },
    { lat: -7.8, lng: 110.36, disease: "Hepatitis A", level: "low", city: "Yogyakarta", cases: 28, recovered: 25, deaths: 0 },
    { lat: -8.65, lng: 115.22, disease: "DBD", level: "medium", city: "Denpasar", cases: 67, recovered: 50, deaths: 2 },
    { lat: 1.47, lng: 124.84, disease: "Malaria", level: "medium", city: "Manado", cases: 92, recovered: 75, deaths: 4 },
    { lat: -3.32, lng: 114.59, disease: "ISPA", level: "low", city: "Banjarmasin", cases: 38, recovered: 35, deaths: 1 },
    { lat: -0.02, lng: 109.34, disease: "DBD", level: "high", city: "Pontianak", cases: 145, recovered: 100, deaths: 7 },
];

const colorMap: Record<string, string> = {
    high: "#ef4444",
    medium: "#f97316",
    low: "#22c55e",
};

const radiusMap: Record<string, number> = {
    high: 80000,
    medium: 55000,
    low: 35000,
};

const riskLabel: Record<string, string> = {
    high: "TINGGI",
    medium: "SEDANG",
    low: "RENDAH",
};

const totalCases = outbreakData.reduce((s, d) => s + d.cases, 0);
const totalActive = outbreakData.filter(d => d.level === "high").reduce((s, d) => s + d.cases, 0);
const totalRecovered = outbreakData.reduce((s, d) => s + d.recovered, 0);
const totalDeaths = outbreakData.reduce((s, d) => s + d.deaths, 0);

function MapController({ flyTarget }: { flyTarget: { lat: number; lng: number; zoom: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (flyTarget) {
            map.flyTo([flyTarget.lat, flyTarget.lng], flyTarget.zoom, { duration: 1.2 });
        }
    }, [flyTarget, map]);
    return null;
}

const pulseCSS = `
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(2.2); opacity: 0; }
}
.pulse-marker {
  position: relative;
}
.pulse-marker::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #ef4444;
  animation: pulse-ring 2s ease-out infinite;
}
`;

function PulsatingMarkers({ onClickPoint }: { onClickPoint: (lat: number, lng: number) => void }) {
    return (
        <>
            {outbreakData.map((point, i) => (
                <Circle
                    key={i}
                    center={[point.lat, point.lng]}
                    radius={radiusMap[point.level]}
                    pathOptions={{
                        color: colorMap[point.level],
                        fillColor: colorMap[point.level],
                        fillOpacity: point.level === "high" ? 0.45 : 0.35,
                        weight: point.level === "high" ? 3 : 2,
                        opacity: 0.9,
                        className: point.level === "high" ? "pulse-marker" : "",
                    }}
                    eventHandlers={{
                        click: () => onClickPoint(point.lat, point.lng),
                    }}
                >
                    <Popup closeButton={false}>
                        <div style={{ minWidth: "180px", padding: "4px 0" }}>
                            <div style={{ fontWeight: 700, fontSize: "14px", color: "#111827", marginBottom: "6px" }}>
                                {point.city.toUpperCase()}
                            </div>
                            <div style={{ color: colorMap[point.level], fontWeight: 800, fontSize: "20px", lineHeight: 1 }}>
                                {point.cases.toLocaleString("id-ID")} KASUS
                            </div>
                            <hr style={{ borderColor: "#e5e7eb", margin: "8px 0" }} />
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontSize: "11px", color: "#6b7280" }}>
                                <div><span style={{ color: "#22c55e" }}>✓</span> Sembuh: {point.recovered}</div>
                                <div><span style={{ color: "#ef4444" }}>†</span> Meninggal: {point.deaths}</div>
                                <div style={{ gridColumn: "span 2" }}>Penyakit: <span style={{ color: "#111827", fontWeight: 600 }}>{point.disease}</span></div>
                                <div style={{ gridColumn: "span 2" }}>Risiko: <span style={{ color: colorMap[point.level], fontWeight: 700 }}>{riskLabel[point.level]}</span></div>
                            </div>
                        </div>
                    </Popup>
                </Circle>
            ))}
        </>
    );
}

interface HeatMapProps {
    fullscreen?: boolean;
}

export default function HeatMap({ fullscreen = false }: HeatMapProps) {
    const [selectedStat, setSelectedStat] = useState<string | null>(null);
    const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null);

    const handleClickPoint = (lat: number, lng: number) => {
        setFlyTarget({ lat, lng, zoom: 10 });
    };

    const statsBar = [
        { key: "cases", label: "Total Kasus", value: totalCases, color: "#ef4444", Icon: Biohazard },
        { key: "active", label: "Kasus Aktif", value: totalActive, color: "#f97316", Icon: Activity },
        { key: "deaths", label: "Meninggal", value: totalDeaths, color: "#6b7280", Icon: Skull },
        { key: "recovered", label: "Sembuh", value: totalRecovered, color: "#22c55e", Icon: TrendingUp },
    ];

    const mapHeight = fullscreen ? "100%" : "460px";

    return (
        <div className={`relative w-full ${fullscreen ? 'h-full' : 'rounded-2xl'} overflow-hidden border border-gray-200 shadow-lg bg-white flex flex-col`}>
            <style dangerouslySetInnerHTML={{ __html: pulseCSS }} />

            <div className="relative z-10 flex flex-wrap border-b border-gray-100 bg-white flex-shrink-0">
                {statsBar.map(({ key, label, value, color, Icon }) => (
                    <button
                        key={key}
                        onClick={() => setSelectedStat(selectedStat === key ? null : key)}
                        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 flex-1 min-w-[100px] transition-all hover:bg-gray-50"
                        style={{
                            borderRight: "1px solid #f3f4f6",
                            background: selectedStat === key ? "#f9fafb" : "transparent",
                        }}
                    >
                        <div
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: `${color}15` }}
                        >
                            <Icon size={16} style={{ color }} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] sm:text-xs text-gray-400 font-medium">{label}</div>
                            <div className="font-bold text-sm sm:text-lg leading-tight" style={{ color }}>
                                {value.toLocaleString("id-ID")}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex-1 relative" style={{ minHeight: fullscreen ? 0 : "460px" }}>
                <MapContainer
                    center={[-2.5, 118]}
                    zoom={5}
                    style={{ height: mapHeight, width: "100%", zIndex: 1, position: fullscreen ? "absolute" : "relative", inset: 0 }}
                    zoomControl={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <PulsatingMarkers onClickPoint={handleClickPoint} />
                    <MapController flyTarget={flyTarget} />
                </MapContainer>

                <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1.5 rounded-xl px-3 py-2.5 bg-white/95 backdrop-blur-md border border-gray-200 shadow-md">
                    {[{ color: "#ef4444", label: "Risiko Tinggi" }, { color: "#f97316", label: "Risiko Sedang" }, { color: "#22c55e", label: "Risiko Rendah" }].map(l => (
                        <div key={l.label} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: l.color, opacity: 0.85 }} />
                            <span className="text-xs text-gray-600 font-medium">{l.label}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-3 right-3 z-10 rounded-xl px-3 py-2 bg-white/95 backdrop-blur-md border border-gray-200 shadow-md">
                    <span className="text-xs text-gray-500">{outbreakData.length} kota dipantau</span>
                </div>
            </div>
        </div>
    );
}
