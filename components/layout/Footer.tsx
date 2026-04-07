import {
    Dna,
    Eye,
    HeartPulse,
    Instagram,
    ShieldPlus,
    Leaf,
    Map,
    MapPinPlus,
    Phone,
    Shield,
    Stethoscope,
    Ambulance,
    Twitter,
    Youtube,
} from "lucide-react";
import Link from "next/link";

const layanan = [
    { href: "/tools", label: "HealthMap", Icon: MapPinPlus },
    { href: "/genomid", label: "GenomID", Icon: Dna },
    { href: "/herbalsainsid", label: "HerbalSainsID", Icon: Leaf },
    { href: "/bemyeye", label: "BeMyEye", Icon: Eye },
    { href: "/simdoc", label: "SimDoc AI", Icon: Stethoscope },
];

const darurat = [
    { label: "Ambulans", number: "118", Icon: Ambulance },
    { label: "BPJS Kesehatan", number: "1500400", Icon: ShieldPlus },
    { label: "Hotline Kemenkes", number: "1500567", Icon: Phone },
    { label: "Crisis Center", number: "119 ext 8", Icon: Phone },
];

const perusahaan = [
    { href: "/about", label: "Tentang Kami" },
    { href: "/konten", label: "Konten & Artikel" },
    { href: "/contact", label: "Hubungi Kami" },
];

const sosial = [
    { label: "Instagram", Icon: Instagram, href: "#" },
    { label: "Twitter", Icon: Twitter, href: "#" },
    { label: "YouTube", Icon: Youtube, href: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg">
                                <img
                                src="/logo1.png"
                                alt="Sehat Selalu Logo"
                                className="w-10 h-10 object-contain"
                            />
                            </div>
                            <span className="font-black text-white text-base tracking-tight">
                                Selalu<span className="text-teal-400">Sehat</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed mb-5">
                            Platform kesehatan digital Indonesia yang menggabungkan AI dengan
                            kearifan lokal untuk masyarakat yang lebih sehat.
                        </p>
                        <div className="flex gap-2">
                            {sosial.map(({ label, Icon, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-teal-500 border border-gray-700 hover:border-teal-400 text-gray-400 hover:text-white transition-all"
                                >
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">
                            Layanan
                        </h4>
                        <ul className="space-y-2.5">
                            {layanan.map(({ href, label, Icon }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="flex items-center gap-2 text-sm hover:text-teal-400 transition group"
                                    >
                                        <Icon
                                            size={13}
                                            className="text-gray-600 group-hover:text-teal-400 transition flex-shrink-0"
                                        />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">
                            Perusahaan
                        </h4>
                        <ul className="space-y-2.5">
                            {perusahaan.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm hover:text-teal-400 transition"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">
                            Layanan Darurat
                        </h4>
                        <ul className="space-y-3">
                            {darurat.map(({ label, number, Icon }) => (
                                <li key={label} className="flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-1.5 text-sm">
                                        <Icon size={12} className="text-gray-600 flex-shrink-0" />
                                        {label}
                                    </span>
                                    <a
                                        href={`tel:${number}`}
                                        className="text-teal-400 hover:text-teal-300 font-bold text-xs tabular-nums transition"
                                    >
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 px-4 sm:px-8 py-5">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} SelaluSehat. Hak Cipta Dilindungi.</p>
                    <p className="text-center">
                        Informasi di platform ini bukan pengganti saran medis profesional. Selalu konsultasikan ke dokter.
                    </p>
                    <div className="flex gap-4">
                        <span className="hover:text-gray-400 cursor-pointer transition">Privasi</span>
                        <span className="hover:text-gray-400 cursor-pointer transition">Syarat & Ketentuan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
