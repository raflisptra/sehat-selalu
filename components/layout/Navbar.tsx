"use client";

import {
    ChevronDown,
    Dna,
    Eye,
    HeartPulse,
    Leaf,
    Map,
    Menu,
    Search,
    MapPinPlus,
    Stethoscope,
    X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const layananLinks = [
    { href: "/tools", label: "HealthMap", desc: "Peta wabah penyakit realtime dan prediksi penyebaran", icon: <MapPinPlus size={18} className="text-teal-600" />, keywords: "peta wabah sebaran penyakit demam berdarah covid indonesia" },
    { href: "/genomid", label: "GenomID", desc: "Analisis risiko genetik dan nutrisi disesuaikan genmu", icon: <Dna size={18} className="text-violet-600" />, keywords: "genetik dna keturunan nutrisi gen" },
    { href: "/herbalsainsid", label: "HerbalSainsID", desc: "Database tanaman obat dengan validasi saintifik", icon: <Leaf size={18} className="text-emerald-600" />, keywords: "herbal jamu tanaman obat tradisional saintifik" },
    { href: "/bemyeye", label: "BeMyEye", desc: "Bantuan navigasi & layanan darurat untuk disabilitas", icon: <Eye size={18} className="text-pink-600" />, keywords: "mata glaukoma katarak retinopati deteksi buta" },
    { href: "/simdoc", label: "SimDoc AI", desc: "Tanya jawab kesehatan instan dengan dokter virtual", icon: <Stethoscope size={18} className="text-blue-600" />, keywords: "dokter ai triase gejala konsultasi tanya" },
];

const mainNav = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/konten", label: "Konten" },
    { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [svcOpen, setSvcOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);

    const filteredServices = search.trim() === "" ? [] : layananLinks.filter(svc =>
        svc.label.toLowerCase().includes(search.toLowerCase()) ||
        svc.desc.toLowerCase().includes(search.toLowerCase()) ||
        svc.keywords.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target))
                setSvcOpen(false);
            if (searchRef.current && !searchRef.current.contains(target))
                setSearch(""); // Auto-close search on outside click
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(target))
                setSearch("");
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setSvcOpen(false);
        setSearch("");
    }, [pathname]);

    const isActive = (href: string) => pathname === href;

    return (
        <header
            className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-lg" : "shadow-sm border-b border-gray-100"
                }`}
        >
            <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-end gap-3">
                    <span className="text-xs text-white/80">
                        Platform Kesehatan Digital Indonesia
                    </span>
                    <span className="text-white/40">|</span>
                    <Link
                        href="/login"
                        className="text-xs font-bold tracking-wide px-4 py-1 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition text-white"
                    >
                        Masuk
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 gap-6">

                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center shadow-md shadow-teal-200">
                            <img
                                src="/logo1.png"
                                alt="Sehat Selalu Logo"
                                className="w-9 h-9 object-contain"
                            />
                        </div>
                        <span className="font-black text-gray-900 text-[1.1rem] tracking-tight leading-none">
                            Selalu<span className="text-teal-500">Sehat</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex flex-1 items-center justify-between ml-4 relative" ref={dropdownRef}>
                        <nav className="flex items-center gap-0.5">
                            {mainNav.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${isActive(href)
                                        ? "text-teal-600"
                                        : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                                        }`}
                                >
                                    {label}
                                    {isActive(href) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-teal-500 rounded-full" />
                                    )}
                                </Link>
                            ))}

                            <div>
                                <button
                                    onClick={() => setSvcOpen((v) => !v)}
                                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${svcOpen
                                        ? "text-teal-600 bg-teal-50"
                                        : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                                        }`}
                                >
                                    Layanan
                                    <ChevronDown
                                        size={13}
                                        className={`transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                            </div>
                        </nav>

                        <div ref={searchRef} className="hidden lg:flex flex-1 max-w-xs ml-auto items-center relative">
                            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 h-9 gap-2 hover:border-teal-300 transition focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 z-10 w-full">
                                <Search size={14} className="text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari layanan, gejala…"
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 font-medium w-full"
                                />
                            </div>

                            {search.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl w-full max-h-[400px] overflow-y-auto p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    {filteredServices.length > 0 ? (
                                        <>
                                            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Hasil Pencarian</div>
                                            {filteredServices.map(svc => (
                                                <div
                                                    key={`search-${svc.href}`}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        router.push(svc.href);
                                                        setSearch("");
                                                    }}
                                                    className="flex items-center gap-3 p-3 mt-1 rounded-xl transition hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100/50 flex items-center justify-center text-sm shadow-sm pointer-events-none">
                                                        {svc.icon}
                                                    </div>
                                                    <div className="pointer-events-none">
                                                        <p className="text-[13px] font-bold text-gray-900">{svc.label}</p>
                                                        <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-1">{svc.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="p-4 text-center text-sm text-gray-500">
                                            Tidak menemukan layanan untuk "{search}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {svcOpen && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl w-full p-6 animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                                <div className="flex items-center justify-between mb-5 px-3">
                                    <h3 className="text-lg font-bold text-gray-800">Layanan Utama</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {layananLinks.map(({ href, label, desc, icon }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setSvcOpen(false)}
                                            className={`flex items-start gap-4 flex-col sm:flex-row p-4 rounded-xl transition ${isActive(href)
                                                ? "bg-teal-50 shadow-sm border border-teal-100/50"
                                                : "hover:bg-gray-50/80 border border-transparent hover:border-gray-100"
                                                }`}
                                        >
                                            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal-100/60 flex flex-col items-center justify-center text-sm shadow-sm shadow-teal-900/5">
                                                {icon}
                                            </div>
                                            <div>
                                                <p className={`text-[14px] sm:text-[15px] font-bold ${isActive(href) ? "text-teal-700" : "text-gray-900"}`}>
                                                    {label}
                                                </p>
                                                <p className="text-[13px] text-gray-500 leading-relaxed mt-1 line-clamp-2">
                                                    {desc}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/about#layanan"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-sm font-bold transition shadow-md shadow-teal-200 flex-shrink-0"
                    >
                        Coba Sekarang
                    </Link>

                    <button
                        className="md:hidden ml-auto p-2 rounded-lg text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[calc(100vh-4rem)] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"
                    }`}
            >
                <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-1">
                    <div ref={mobileSearchRef} className="relative mb-3">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 h-10 gap-2 relative z-20">
                            <Search size={14} className="text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari layanan, gejala…"
                                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 font-medium w-full"
                            />
                        </div>

                        {search.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                {filteredServices.length > 0 ? (
                                    <div className="p-2 max-h-[300px] overflow-y-auto w-full">
                                        <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Hasil Pencarian</div>
                                        {filteredServices.map(svc => (
                                            <div
                                                key={`m-search-${svc.href}`}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    router.push(svc.href);
                                                    setSearch("");
                                                    setMobileOpen(false);
                                                }}
                                                className="flex items-center gap-3 p-3 mt-1 w-full rounded-xl transition hover:bg-gray-50 cursor-pointer"
                                            >
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100/50 flex items-center justify-center text-sm shadow-sm pointer-events-none">
                                                    {svc.icon}
                                                </div>
                                                <div className="min-w-0 flex-1 pointer-events-none">
                                                    <p className="text-[13px] font-bold text-gray-900 truncate">{svc.label}</p>
                                                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5 truncate">{svc.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-sm text-gray-500">
                                        Tidak ada layanan untuk "{search}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {mainNav.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive(href)
                                ? "bg-teal-50 text-teal-600"
                                : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="overflow-hidden">
                        <button
                            onClick={() => setMobileSvcOpen((v) => !v)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${mobileSvcOpen ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            Layanan
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-300 ${mobileSvcOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out origin-top overflow-hidden ${mobileSvcOpen ? "max-h-[500px] mt-1 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <div className="px-2 pb-2 space-y-1">
                                {layananLinks.map(({ href, label, icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => { setMobileOpen(false); setMobileSvcOpen(false); }}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${isActive(href)
                                            ? "text-teal-700 bg-teal-100/50 font-bold"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className="text-base">{icon}</span>
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/about#layanan"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center w-full mt-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-3 rounded-xl text-sm font-bold transition shadow-md shadow-teal-100"
                    >
                        Coba Sekarang
                    </Link>
                </div>
            </div>
        </header>
    );
}
