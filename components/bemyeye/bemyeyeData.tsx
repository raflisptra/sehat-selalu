import React from "react";
import { 
  Accessibility, 
  Ambulance,
  Flame,
  HeartPulse,
  Hospital, 
  MapPin, 
  MessageCircleOff,
  PenLine,
  Pill,
  ShieldCheck,
  ShieldPlus,
  Users
} from "lucide-react";
import { MdBlind, MdFamilyRestroom, MdMedicalServices, MdOutlineFireTruck } from "react-icons/md";
import { GiHospitalCross, GiPoliceCar } from "react-icons/gi";
import { RiMentalHealthLine } from "react-icons/ri";
import { FaPersonFalling } from "react-icons/fa6";
import { LiaDeafSolid } from "react-icons/lia";

export interface SignLetter {
  letter: string;
  emoji: string;
  description: string;
  fingerPosition: string;
}

export interface EmergencyContact {
  name: string;
  number: string;
  icon: React.ReactNode;
  colorClass: string;
  desc: string;
}

export interface QuickMessage {
  msg: string;
  icon: React.ReactNode;
  category: "darurat" | "disabilitas" | "umum";
}

export const signLanguageData: Record<string, SignLetter> = {
  A: { letter: "A", emoji: "/A.jpg", description: "Genggam semua jari, ibu jari di samping telunjuk", fingerPosition: "Kepalan penuh" },
  B: { letter: "B", emoji: "/B.jpg", description: "Semua jari lurus, rapat, dan menghadap ke atas", fingerPosition: "Semua jari tegak" },
  C: { letter: "C", emoji: "/C.jpg", description: "Semua jari melengkung membentuk huruf C", fingerPosition: "Setengah lingkaran" },
  D: { letter: "D", emoji: "/D.jpg", description: "Telunjuk lurus ke atas, jari lain membentuk lingkaran menyentuh ibu jari", fingerPosition: "Telunjuk tegak" },
  E: { letter: "E", emoji: "/E.jpg", description: "Semua jari ditekuk ke dalam, ibu jari di bawah jari-jari", fingerPosition: "Jari tertekuk" },
  F: { letter: "F", emoji: "/F.jpg", description: "Ibu jari dan telunjuk membentuk lingkaran, tiga jari lain lurus", fingerPosition: "OK sign" },
  G: { letter: "G", emoji: "/G.jpg", description: "Telunjuk dan ibu jari sejajar menunjuk ke samping kiri", fingerPosition: "Telunjuk horizontal" },
  H: { letter: "H", emoji: "/H.jpg", description: "Telunjuk dan jari tengah lurus sejajar horizontal", fingerPosition: "Dua jari horizontal" },
  I: { letter: "I", emoji: "/I.jpg", description: "Kelingking lurus ke atas, semua jari lain digenggam", fingerPosition: "Kelingking tegak" },
  J: { letter: "J", emoji: "/J.jfif", description: "Kelingking lurus ke atas lalu gerakkan membentuk huruf J", fingerPosition: "Kelingking + gerakan J" },
  K: { letter: "K", emoji: "/K.jfif", description: "Telunjuk dan jari tengah membentuk V, ibu jari di antara keduanya", fingerPosition: "V dengan ibu jari" },
  L: { letter: "L", emoji: "/L.jpg", description: "Ibu jari dan telunjuk lurus membentuk sudut 90° seperti huruf L", fingerPosition: "Sudut L" },
  M: { letter: "M", emoji: "/M.jpg", description: "Tiga jari (telunjuk, tengah, manis) ditekuk di atas ibu jari", fingerPosition: "Tiga jari di ibu jari" },
  N: { letter: "N", emoji: "/N.jpg", description: "Dua jari (telunjuk dan tengah) ditekuk di atas ibu jari", fingerPosition: "Dua jari di ibu jari" },
  O: { letter: "O", emoji: "/O.jpg", description: "Semua jari dan ibu jari membentuk lingkaran sempurna", fingerPosition: "Lingkaran penuh" },
  P: { letter: "P", emoji: "/P.jpg", description: "Telunjuk menunjuk ke bawah, ibu jari ke samping, jari lain digenggam", fingerPosition: "Menunjuk bawah" },
  Q: { letter: "Q", emoji: "/Q.jpg", description: "Telunjuk dan ibu jari menunjuk ke bawah", fingerPosition: "Dua jari bawah" },
  R: { letter: "R", emoji: "/R.jpg", description: "Telunjuk dan jari tengah disilangkan satu sama lain", fingerPosition: "Jari bersilang" },
  S: { letter: "S", emoji: "/S.jfif", description: "Kepalan penuh dengan ibu jari di depan menutup jari-jari", fingerPosition: "Kepalan ibu jari depan" },
  T: { letter: "T", emoji: "/T.jpg", description: "Ibu jari disisipkan di antara telunjuk dan jari tengah", fingerPosition: "Ibu jari di tengah" },
  U: { letter: "U", emoji: "/U.jpg", description: "Telunjuk dan jari tengah lurus rapat berdampingan ke atas", fingerPosition: "Dua jari rapat tegak" },
  V: { letter: "V", emoji: "/V.jpg", description: "Telunjuk dan jari tengah membentuk huruf V/peace sign", fingerPosition: "Peace sign" },
  W: { letter: "W", emoji: "/W.jpg", description: "Telunjuk, jari tengah, dan jari manis lurus terbuka membentuk W", fingerPosition: "Tiga jari terbuka" },
  X: { letter: "X", emoji: "/X.jpg", description: "Telunjuk dilengkungkan/ditekuk seperti kait", fingerPosition: "Telunjuk melengkung" },
  Y: { letter: "Y", emoji: "/Y.jpg", description: "Ibu jari dan kelingking terbuka lebar, jari lain digenggam", fingerPosition: "Hang loose" },
  Z: { letter: "Z", emoji: "/Z.jpg", description: "Telunjuk lurus menggambar huruf Z di udara", fingerPosition: "Telunjuk + gerakan Z" },
};

export const emergencyContacts: EmergencyContact[] = [
  { name: "Ambulans",        number: "118",       icon: <Ambulance size={32} />,       colorClass: "border-red-500 bg-red-500/10 text-red-400",         desc: "Panggil ambulans darurat" },
  { name: "Pemadam",         number: "113",       icon: <MdOutlineFireTruck size={32} />,           colorClass: "border-orange-500 bg-orange-500/10 text-orange-400", desc: "Kebakaran & penyelamatan" },
  { name: "Polisi",          number: "110",       icon: <GiPoliceCar size={32} />,     colorClass: "border-blue-500 bg-blue-500/10 text-blue-400",       desc: "Keamanan & kedaruratan" },
  { name: "BPJS Kesehatan",  number: "1500400",   icon: <ShieldPlus size={32} />,        colorClass: "border-green-500 bg-green-500/10 text-green-400",    desc: "Layanan BPJS" },
  { name: "Hotline Kemenkes",number: "1500567",   icon: <GiHospitalCross size={32} />,            colorClass: "border-teal-500 bg-teal-500/10 text-teal-400",       desc: "Info kesehatan nasional" },
  { name: "Crisis Center",   number: "119 ext 8", icon: <RiMentalHealthLine size={32} />,      colorClass: "border-pink-500 bg-pink-500/10 text-pink-400",       desc: "Krisis jiwa & kesehatan" },
];

export const quickMessages: QuickMessage[] = [
  { msg: "Saya butuh ambulans segera. Saya tidak bisa bicara.", icon: <Ambulance size={24} />,       category: "darurat" },
  { msg: "Ada orang tidak sadarkan diri di lokasi saya.",        icon: <FaPersonFalling size={24} />,     category: "darurat" },
  { msg: "Saya membutuhkan bantuan medis segera.",               icon: <MdMedicalServices size={24} />,       category: "darurat" },
  { msg: "Saya tunarungu. Tolong komunikasi lewat tulisan.",              icon: <LiaDeafSolid size={24} />,        category: "disabilitas" },
  { msg: "Saya tunanetra. Tolong bantu arahkan saya ke tempat aman.",     icon: <MdBlind size={24} />,  category: "disabilitas" },
  { msg: "Saya tidak dapat berbicara. Tolong baca pesan ini.",            icon: <MessageCircleOff size={24} />, category: "disabilitas" },
  { msg: "Tolong hubungi keluarga saya segera.",                          icon: <MdFamilyRestroom size={24} />,          category: "umum" },
  { msg: "Di mana fasilitas kesehatan terdekat?",                         icon: <Hospital size={24} />,         category: "umum" },
];