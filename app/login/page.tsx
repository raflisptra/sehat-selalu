import { ArrowRight, HeartPulse, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden py-10 px-4">

            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[60px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-2 mb-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-200 group-hover:scale-105 transition-transform">
                             <img
                                src="/logo1.png"
                                alt="Sehat Selalu Logo"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        <span className="font-black text-gray-900 text-2xl tracking-tight leading-none">
                            Selalu<span className="text-teal-500">Sehat</span>
                        </span>
                    </Link>
                    <p className="text-gray-500 text-sm font-medium">Selamat datang kembali!</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 mb-6">
                    <form className="flex flex-col gap-5">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none transition-all focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100 placeholder-gray-400 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none transition-all focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100 placeholder-gray-400 font-medium"
                                    required
                                />
                            </div>
                            <div className="flex justify-end pt-1">
                                <Link href="#" className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline">
                                    Lupa password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-300"
                        >
                            Masuk Sekarang
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-sm font-medium">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-teal-600 font-bold hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </main>
    );
}
