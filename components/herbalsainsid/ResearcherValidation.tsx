"use client";
import { useState } from "react";
import React from "react";
import { 
  Award, 
  BadgeCheck,
  Beaker,
  BookOpen,
  BookOpenCheck,
  BookText,
  Building,
  Building2,
  CheckCheck,
  CheckCircle2,
  Clock,
  Earth, 
  FileText,
  FlaskConical, 
  Globe,
  Hospital,
  Hourglass,
  HousePlus,
  Landmark, 
  Leaf,
  LeafyGreen, 
  LibraryBig, 
  Mail, 
  Medal,
  Microscope, 
  Newspaper, 
  Sprout,
  Stethoscope, 
  Telescope,
  User,
  UserCheck,
  UserRoundCheck,
  Vegan 
} from "lucide-react";
import { herbalPlants } from "./herbalData";
import { BsBuildings, BsLeaf } from "react-icons/bs";
import { FaSchoolCircleCheck, FaUserGraduate } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiMicroscope } from "react-icons/gi";
import { TbBuildingHospital } from "react-icons/tb";
import { PiBuildingApartment } from "react-icons/pi";

interface Researcher {
  name: string;
  institution: string;
  specialty: string;
  verified: boolean;
  publications: number;
  avatar: React.ReactNode;
  validatedPlants: string[];
  email: string;
}

const researchers: Researcher[] = [
  {
    name: "Prof. Dr. Endang Sutriswati Rahayu",
    institution: "Universitas Gadjah Mada",
    specialty: "Fitokimia & Teknologi Herbal",
    verified: true, publications: 47, avatar: <FaUserGraduate size={36} className="text-emerald-400" />,
    validatedPlants: ["Kunyit", "Temulawak"],
    email: "endang@ugm.ac.id",
  },
  {
    name: "Dr. Ahmad Fauzi Pohan, SpPD",
    institution: "RSUP Dr. Cipto Mangunkusumo",
    specialty: "Penyakit Dalam & Herbal Medicine",
    verified: true, publications: 23, avatar: <FaUserGraduate size={36} className="text-blue-400" />,
    validatedPlants: ["Temulawak", "Jahe"],
    email: "afpohan@rscm.co.id",
  },
  {
    name: "Prof. Dr. Bambang Prajogo EW",
    institution: "Universitas Airlangga",
    specialty: "Farmakognosi & Fitokimia",
    verified: true, publications: 62, avatar: <FaUserGraduate size={36} className="text-purple-400" />,
    validatedPlants: ["Sambiloto", "Kunyit", "Jahe"],
    email: "bambang@unair.ac.id",
  },
  {
    name: "Dr. Hendra Susanto, M.Si",
    institution: "Institut Pertanian Bogor",
    specialty: "Biokimia Tanaman Obat",
    verified: true, publications: 31, avatar: <FaUserGraduate size={36} className="text-teal-400" />,
    validatedPlants: ["Sambiloto", "Daun Sirih"],
    email: "hendra@ipb.ac.id",
  },
  {
    name: "Dr. Maya Sari Dewi, SpKK",
    institution: "Universitas Indonesia",
    specialty: "Dermatologi & Herbal Topikal",
    verified: true, publications: 18, avatar: <FaUserGraduate size={36} className="text-pink-400" />,
    validatedPlants: ["Lidah Buaya", "Daun Sirih"],
    email: "maya@ui.ac.id",
  },
  {
    name: "Prof. Wahyu Prijanto",
    institution: "Balai Besar Litbang TOGA",
    specialty: "Tanaman Obat Keluarga",
    verified: false, publications: 15, avatar: <FaUserGraduate size={36} className="text-gray-400" />,
    validatedPlants: ["Jahe", "Temulawak"],
    email: "wahyu@balitro.go.id",
  },
];

const institutions = [
  { name: "BPOM RI",     icon: <HiOutlineBuildingOffice2 size={24} />, desc: "Badan Pengawas Obat & Makanan",          color: "border-blue-700 bg-blue-900/20" },
  { name: "LIPI / BRIN", icon: <GiMicroscope size={24} />, desc: "Lembaga Ilmu Pengetahuan Indonesia",    color: "border-purple-700 bg-purple-900/20" },
  { name: "Kemenkes RI", icon: <TbBuildingHospital size={24} />, desc: "Kementerian Kesehatan Republik Indonesia", color: "border-green-700 bg-green-900/20" },
  { name: "Balitro",     icon: <PiBuildingApartment size={24} />, desc: "Balai Penelitian Tanaman Rempah & Obat",      color: "border-emerald-700 bg-emerald-900/20" },
  { name: "WHO SEARO",   icon: <Landmark size={24} />, desc: "WHO South-East Asia Regional Office",        color: "border-teal-700 bg-teal-900/20" },
  { name: "BPPT",        icon: <FaSchoolCircleCheck size={24} />, desc: "Badan Pengkajian & Penerapan Teknologi", color: "border-orange-700 bg-orange-900/20" },
];

export default function ResearcherValidation() {
  const [filterPlant, setFilterPlant] = useState("Semua");
  const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null);

  const plantFilters = ["Semua", ...Array.from(new Set(researchers.flatMap(r => r.validatedPlants)))];

  const filteredResearchers = filterPlant === "Semua"
    ? researchers
    : researchers.filter(r => r.validatedPlants.includes(filterPlant));

  const totalVerified    = researchers.filter(r => r.verified).length;
  const totalPublications = researchers.reduce((sum, r) => sum + r.publications, 0);
  const totalPlants      = herbalPlants.length;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <BadgeCheck size={24} className="text-emerald-400 mx-auto" />, label: "Peneliti Terverifikasi", value: totalVerified },
          { icon: <BookText size={24} className="text-emerald-400 mx-auto" />,     label: "Total Publikasi",         value: totalPublications },
          { icon: <Sprout size={24} className="text-emerald-400 mx-auto" />,         label: "Tanaman Tervalidasi",     value: totalPlants },
          { icon: <BsBuildings size={24} className="text-emerald-400 mx-auto" />,    label: "Institusi Mitra",         value: institutions.length },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className="flex justify-center mb-1">{stat.icon}</div>
            <div className="text-2xl font-extrabold text-emerald-400">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-600 rounded-2xl p-4 text-amber-400 text-sm flex items-start gap-2">
        <UserRoundCheck size={16} className="flex-shrink-0 mt-0.5" /> Platform ini hanya menampilkan informasi herbal yang telah divalidasi oleh peneliti terverifikasi dari institusi terpercaya Indonesia dan internasional.
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-3">Filter berdasarkan tanaman yang divalidasi:</p>
        <div className="flex gap-2 flex-wrap">
          {plantFilters.map(plant => (
            <button key={plant} onClick={() => setFilterPlant(plant)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${filterPlant === plant ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500 hover:text-emerald-400"}`}>
              {plant === "Semua" ? <span className="flex items-center gap-1"><Leaf size={11} /> Semua</span> : plant}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResearchers.map(r => (
          <div key={r.name}
            onClick={() => setSelectedResearcher(selectedResearcher?.name === r.name ? null : r)}
            className={`rounded-2xl border p-5 cursor-pointer transition hover:scale-[1.02] ${selectedResearcher?.name === r.name ? "border-emerald-500 bg-emerald-900/10" : "border-white/10 bg-white/5 hover:border-emerald-700"}`}>

            <div className="flex items-start gap-3 mb-3">
              <div className="text-emerald-400">{r.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <h4 className="font-bold text-white text-sm leading-tight">{r.name}</h4>
                  {r.verified && <BadgeCheck size={14} className="text-blue-400 flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-400 truncate">{r.institution}</p>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-2 mb-3">
              <p className="text-xs text-gray-400">Spesialisasi</p>
              <p className="text-sm text-emerald-400 font-medium">{r.specialty}</p>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-gray-400">Publikasi Ilmiah</span>
              <span className="text-sm font-bold text-white">{r.publications} paper</span>
            </div>

            <div className="flex gap-1 flex-wrap mb-3">
              {r.validatedPlants.map(p => (
                <span key={p} className="bg-emerald-900/30 border border-emerald-800 text-emerald-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <BsLeaf size={10} /> {p}
                </span>
              ))}
            </div>

            <div className={`rounded-lg px-3 py-1.5 text-xs text-center font-bold ${r.verified ? "bg-green-500/10 border border-green-500 text-green-400" : "bg-gray-500/10 border border-gray-500 text-gray-400"}`}>
              {r.verified
                ? <><BadgeCheck size={14} className="inline mr-1" />Terverifikasi</>
                : <><Hourglass size={14} className="inline mr-1" />Dalam Proses Verifikasi</>}
            </div>

            {selectedResearcher?.name === r.name && (
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail size={12} />
                  <span>{r.email}</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-700 rounded-lg p-3">
                  <p className="text-xs text-blue-400 font-semibold mb-1 flex items-center gap-1"><BookOpenCheck size={12} /> Tanaman yang Divalidasi:</p>
                  <p className="text-xs text-gray-300">{r.validatedPlants.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h4 className="font-bold text-emerald-400 mb-4 flex items-center gap-1.5"><Building2 size={16} /> Institusi Mitra Terpercaya</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {institutions.map(inst => (
            <div key={inst.name} className={`rounded-xl border p-3 text-center ${inst.color}`}>
              <div className="flex justify-center text-white mb-1">{inst.icon}</div>
              <p className="font-bold text-white text-xs">{inst.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-tight">{inst.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-700 rounded-2xl p-6">
        <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5"><Microscope size={16} /> Bergabung Sebagai Validator</h4>
        <p className="text-sm text-gray-400 mb-4">
          Apakah Anda peneliti atau dokter yang ingin berkontribusi memvalidasi informasi herbal Indonesia?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {[
            { step: "1", title: "Kirim Profil", desc: "Lengkapi CV dan daftar publikasi ilmiah Anda" },
            { step: "2", title: "Verifikasi",   desc: "Tim kami akan memverifikasi kredensial Anda" },
            { step: "3", title: "Kontribusi",   desc: "Mulai validasi dan tambahkan riset terbaru" },
          ].map(item => (
            <div key={item.step} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center mb-2">
                {item.step}
              </div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}