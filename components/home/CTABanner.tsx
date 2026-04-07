import ShinyButton from "@/components/ui/ShinyButton";
import { HeartPulse, Leaf, Stethoscope } from "lucide-react";

export default function CTABanner() {
    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
            <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl p-8 sm:p-12 text-center text-white overflow-hidden shadow-xl shadow-teal-200">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 border border-white/30 mb-6 mx-auto">
                        <img
                                src="/logo1.png"
                                alt="Sehat Selalu Logo"
                                className="w-20 h-20 object-contain"
                            />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                        Siap Jaga Kesehatan Anda?
                    </h2>
                    <p className="text-teal-100 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                        Konsultasikan gejala Anda dengan SimDoc AI — gratis, cepat, dan didukung data medis terpercaya dari seluruh Indonesia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <ShinyButton href="/simdoc" variant="primary">
                            <Stethoscope size={17} />
                            Mulai Konsultasi AI
                        </ShinyButton>
                        <ShinyButton href="/herbalsainsid" variant="secondary">
                            <Leaf size={17} />
                            Cek Herbal Lokal
                        </ShinyButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
