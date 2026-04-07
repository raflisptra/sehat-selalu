"use client";
import {
    Bed,
    Building2,
    ChevronDown, ChevronUp,
    Clock,
    Hospital,
    Map,
    MapPin, Phone,
    Search,
    ShieldCheck, 
    ShieldPlus,
    Siren,
    Star,
    Stethoscope,
} from "lucide-react";
import { useState } from "react";

interface HospitalItem {
    id: string;
    name: string;
    type: "RS Pusat" | "RS Daerah" | "RS Swasta" | "Puskesmas" | "Klinik";
    city: string;
    province: string;
    address: string;
    phone: string;
    bpjs: boolean;
    emergency: boolean;
    beds: number;
    rating: number;
    distance: string;
    specialties: string[];
    operationalHours: string;
    lat: number;
    lng: number;
}

const hospitalData: HospitalItem[] = [
    { id: "1", name: "RSUP Dr. Cipto Mangunkusumo", type: "RS Pusat", city: "Jakarta Pusat", province: "DKI Jakarta", address: "Jl. Diponegoro No.71, Kenari, Senen", phone: "021-500135", bpjs: true, emergency: true, beds: 987, rating: 4.5, distance: "2.3 km", specialties: ["Jantung", "Kanker", "Saraf", "Paru", "Anak"], operationalHours: "24 Jam", lat: -6.1944, lng: 106.8425 },
    { id: "2", name: "RS Dr. Soetomo", type: "RS Pusat", city: "Surabaya", province: "Jawa Timur", address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8", phone: "031-5501011", bpjs: true, emergency: true, beds: 1530, rating: 4.6, distance: "3.1 km", specialties: ["Bedah", "Jantung", "Ortopedi", "Mata", "THT"], operationalHours: "24 Jam", lat: -7.268, lng: 112.7513 },
    { id: "3", name: "RSUP Dr. Hasan Sadikin", type: "RS Pusat", city: "Bandung", province: "Jawa Barat", address: "Jl. Pasteur No.38, Pasteur", phone: "022-2034953", bpjs: true, emergency: true, beds: 956, rating: 4.4, distance: "4.5 km", specialties: ["Neurologi", "Onkologi", "Kardiologi", "Pediatri"], operationalHours: "24 Jam", lat: -6.8944, lng: 107.605 },
    { id: "4", name: "Puskesmas Gambir", type: "Puskesmas", city: "Jakarta Pusat", province: "DKI Jakarta", address: "Jl. Cideng Timur No.5, Gambir", phone: "021-3441119", bpjs: true, emergency: false, beds: 10, rating: 4.1, distance: "0.8 km", specialties: ["Umum", "Gigi", "KIA", "Imunisasi"], operationalHours: "07:00 - 16:00", lat: -6.1701, lng: 106.8182 },
    { id: "5", name: "RS Siloam Semanggi", type: "RS Swasta", city: "Jakarta Selatan", province: "DKI Jakarta", address: "Jl. Jend. Sudirman Kav. 76, Setiabudi", phone: "021-25539555", bpjs: false, emergency: true, beds: 340, rating: 4.7, distance: "5.2 km", specialties: ["Kardiologi", "Onkologi", "Bedah Plastik", "Fertilitas"], operationalHours: "24 Jam", lat: -6.2297, lng: 106.8023 },
    { id: "6", name: "RSUD Prof. Dr. Margono", type: "RS Daerah", city: "Purwokerto", province: "Jawa Tengah", address: "Jl. Dr. Gumbreg No.1, Berkoh", phone: "0281-632708", bpjs: true, emergency: true, beds: 450, rating: 4.2, distance: "6.8 km", specialties: ["Umum", "Bedah", "Kebidanan", "Anak", "Jiwa"], operationalHours: "24 Jam", lat: -7.4328, lng: 109.2396 },
    { id: "7", name: "Puskesmas Mlati II", type: "Puskesmas", city: "Sleman", province: "DI Yogyakarta", address: "Jl. Magelang KM 10, Tirtoadi", phone: "0274-868204", bpjs: true, emergency: false, beds: 8, rating: 4.3, distance: "1.2 km", specialties: ["Umum", "Gigi", "Lansia", "Stunting"], operationalHours: "07:30 - 15:30", lat: -7.7271, lng: 110.3468 },
    { id: "8", name: "RS Wahidin Sudirohusodo", type: "RS Pusat", city: "Makassar", province: "Sulawesi Selatan", address: "Jl. Perintis Kemerdekaan KM.11", phone: "0411-584677", bpjs: true, emergency: true, beds: 870, rating: 4.3, distance: "7.1 km", specialties: ["Jantung", "Saraf", "Bedah", "Penyakit Dalam"], operationalHours: "24 Jam", lat: -5.1477, lng: 119.4881 },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={11}
                    className={star <= Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
            ))}
            <span className="text-xs text-gray-400 ml-1">{rating}</span>
        </div>
    );
}

const typeColor: Record<string, string> = {
    "RS Pusat": "bg-red-50 border-red-200 text-red-600",
    "RS Daerah": "bg-orange-50 border-orange-200 text-orange-600",
    "RS Swasta": "bg-violet-50 border-violet-200 text-violet-600",
    "Puskesmas": "bg-emerald-50 border-emerald-200 text-emerald-600",
    "Klinik": "bg-blue-50 border-blue-200 text-blue-600",
};

function TypeIcon({ type }: { type: string }) {
    if (type === "Puskesmas") return <Building2 size={11} />;
    if (type === "Klinik") return <Stethoscope size={11} />;
    return <Hospital size={11} />;
}

export default function HospitalFinder() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("Semua");
    const [filterBpjs, setFilterBpjs] = useState(false);
    const [filterEmergency, setFilterEmergency] = useState(false);
    const [filterProvince, setFilterProvince] = useState("Semua");
    const [selected, setSelected] = useState<HospitalItem | null>(null);

    const types = ["Semua", "RS Pusat", "RS Daerah", "RS Swasta", "Puskesmas", "Klinik"];
    const provinces = ["Semua", ...Array.from(new Set(hospitalData.map(h => h.province)))];

    const filtered = hospitalData.filter(h => {
        const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
            h.city.toLowerCase().includes(search.toLowerCase()) ||
            h.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
        const matchType = filterType === "Semua" || h.type === filterType;
        const matchBpjs = !filterBpjs || h.bpjs;
        const matchEmergency = !filterEmergency || h.emergency;
        const matchProvince = filterProvince === "Semua" || h.province === filterProvince;
        return matchSearch && matchType && matchBpjs && matchEmergency && matchProvince;
    });

    return (
        <div className="space-y-4">

            <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input type="text"
                    placeholder="Cari rumah sakit, kota, atau spesialisasi..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-5 py-3 text-gray-800 placeholder-gray-300 focus:border-blue-400 outline-none text-sm shadow-sm"
                />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
                <div className="flex gap-1.5 flex-wrap">
                    {types.map(type => (
                        <button key={type} onClick={() => setFilterType(type)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${filterType === type
                                    ? "bg-blue-500 border-blue-500 text-white"
                                    : "bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500"
                                }`}>
                            {type}
                        </button>
                    ))}
                </div>

                <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 focus:border-blue-400 outline-none">
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <button onClick={() => setFilterBpjs(!filterBpjs)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${filterBpjs ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-gray-200 text-gray-500 hover:border-blue-300"
                        }`}>
                    <ShieldPlus size={12} /> BPJS
                </button>
                <button onClick={() => setFilterEmergency(!filterEmergency)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${filterEmergency ? "bg-red-500 border-red-500 text-white" : "bg-white border-gray-200 text-gray-500 hover:border-red-300"
                        }`}>
                    <Siren size={12} /> IGD 24 Jam
                </button>
            </div>

            <p className="text-xs text-gray-400">
                Menampilkan <span className="text-blue-500 font-bold">{filtered.length}</span> dari {hospitalData.length} fasilitas kesehatan
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-gray-300">
                        <Hospital size={48} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Tidak ada fasilitas yang sesuai filter</p>
                    </div>
                ) : (
                    filtered.map(hospital => (
                        <div key={hospital.id}
                            onClick={() => setSelected(selected?.id === hospital.id ? null : hospital)}
                            className={`rounded-2xl border p-5 cursor-pointer transition-all ${selected?.id === hospital.id
                                    ? "border-blue-300 bg-blue-50 shadow-sm"
                                    : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"
                                }`}>

                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 pr-2">
                                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{hospital.name}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                        <MapPin size={10} /> {hospital.city}, {hospital.province}
                                    </p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-lg border flex-shrink-0 flex items-center gap-1 font-semibold ${typeColor[hospital.type]}`}>
                                    <TypeIcon type={hospital.type} /> {hospital.type}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                                <StarRating rating={hospital.rating} />
                                <span className="text-xs text-blue-500 flex items-center gap-1">
                                    <MapPin size={10} /> {hospital.distance}
                                </span>
                            </div>

                            <div className="flex gap-1.5 flex-wrap mb-3">
                                {hospital.bpjs && (
                                    <span className="bg-blue-50 border border-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <ShieldPlus size={9} /> BPJS
                                    </span>
                                )}
                                {hospital.emergency && (
                                    <span className="bg-red-50 border border-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Siren size={9} /> IGD 24 Jam
                                    </span>
                                )}
                                <span className="bg-gray-50 border border-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Bed size={9} /> {hospital.beds} TT
                                </span>
                                <span className="bg-gray-50 border border-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Clock size={9} /> {hospital.operationalHours}
                                </span>
                            </div>

                            <div className="flex gap-1 flex-wrap mb-2">
                                {hospital.specialties.slice(0, 4).map(s => (
                                    <span key={s} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{s}</span>
                                ))}
                                {hospital.specialties.length > 4 && (
                                    <span className="text-gray-400 text-xs px-1">+{hospital.specialties.length - 4} lainnya</span>
                                )}
                            </div>

                            {selected?.id === hospital.id && (
                                <div className="border-t border-blue-100 pt-3 mt-2 space-y-2.5">
                                    <p className="text-xs text-gray-500 flex items-start gap-1.5">
                                        <MapPin size={12} className="mt-0.5 flex-shrink-0 text-gray-300" />
                                        {hospital.address}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <a href={`tel:${hospital.phone}`}
                                            className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-xl py-2 text-xs text-center transition flex items-center justify-center gap-1"
                                            onClick={e => e.stopPropagation()}>
                                            <Phone size={11} /> {hospital.phone}
                                        </a>
                                        <a href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lng}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 rounded-xl py-2 text-xs text-center transition flex items-center justify-center gap-1"
                                            onClick={e => e.stopPropagation()}>
                                            <Map size={11} /> Buka Maps
                                        </a>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                        <p className="text-xs text-gray-400 mb-1.5">Semua Spesialisasi:</p>
                                        <div className="flex gap-1 flex-wrap">
                                            {hospital.specialties.map(s => (
                                                <span key={s} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-gray-300 mt-2 text-center flex items-center justify-center gap-1">
                                {selected?.id === hospital.id
                                    ? <><ChevronUp size={11} /> Tutup detail</>
                                    : <><ChevronDown size={11} /> Lihat detail</>
                                }
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
