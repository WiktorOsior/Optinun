import { FileText } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20">

            <div className="mb-20 border-l-[3px] border-[#189eac] pl-8">
                <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">How It Works</h1>
                <p className="text-xl text-zinc-400 leading-relaxed">
                    Transparency is the core of this website. Here is exactly how
                    media bias and coverage volume are measured here.
                </p>
            </div>

            <section className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-[#189eac]">01.</span> The Analysis Engine
                </h2>
                <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-10 border border-white/[0.05] shadow-xl">
                    <p className="leading-relaxed text-zinc-300 mb-6">
                        Every day, our automated scrapers process over 4000 headlines and descriptions. We use vector embeddings to
                        group them into semantic topics.
                    </p>
                    <p className="leading-relaxed text-zinc-400">
                        We do not manually tag articles. The categorization is purely mathematical, based on the
                        semantic distance between the articles' descriptions.
                    </p>
                </div>
            </section>

            <section className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="text-[#189eac]">02.</span> The Source Selection
                </h2>

                <p className="text-zinc-400 mb-10 leading-relaxed">
                    We track the top 5 most influential outlets across the political spectrum to ensure a balanced
                    comparison of narrative volume.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border-2 border-rose-500/50 p-1 bg-white overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg">
                            <img src="/assets/onet.png" alt="ONET" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">Far Left</span>
                    </div>

                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border-2 border-rose-300/30 p-1 bg-white overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg">
                            <img src="/assets/tvn.png" alt="TVN" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300">Left Leaning</span>
                    </div>

                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border-2 border-zinc-500/30 p-1 bg-white overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg">
                            <img src="/assets/polsat.png" alt="POLSAT" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Center</span>
                    </div>

                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border-2 border-blue-300/30 p-1 bg-white overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg">
                            <img src="/assets/interia.png" alt="INTERIA" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Right Leaning</span>
                    </div>

                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border-2 border-blue-500/50 p-1 bg-white overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg">
                            <img src="/assets/wpolsce24.jpg" alt="WPOLSCE24" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Far Right</span>
                    </div>
                </div>

                <div className="bg-[#189eac]/5 border-l-2 border-[#189eac]/40 p-6 rounded-r-2xl">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                        <strong className="text-white">Why Volume Matters:</strong> We compare the absolute number of articles published by
                        each outlet on a specific topic. If the "Right" publishes 50 articles on a topic while the
                        "Left" publishes only 5, it indicates an agenda-setting effort by one side, regardless of the
                        content's truth.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="text-[#189eac]">03.</span> Bias Determination
                </h2>
                <p className="text-zinc-400 mb-10 leading-relaxed">
                    We do not guess the political leaning of these outlets. Our classifications are strictly based on
                    third-party public perception surveys and academic media bias research.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <a href="https://www.umk.pl/wiadomosci/dokumenty/Kto_ma_przewage_w_polskim_dyskursie_medialnym_1691066362.pdf" target="_blank"
                       className="group flex items-start gap-5 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#189eac]/40 transition-all duration-300">
                        <div className="p-4 bg-zinc-900 rounded-xl group-hover:bg-[#189eac]/10 transition-colors">
                            <FileText className="w-6 h-6 text-zinc-500 group-hover:text-[#189eac]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-200 group-hover:text-white transition-colors">Uniwersytet Mikołaja Kopernika</h3>
                            <p className="text-xs text-zinc-500 mt-2 italic leading-relaxed">"Kto ma przewagę w Polskim dyskursie medialnym"</p>
                        </div>
                    </a>

                    <a href="https://ruj.uj.edu.pl/entities/publication/cefb469c-5d75-49da-94d3-1cc2fb186d7a" target="_blank"
                       className="group flex items-start gap-5 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#189eac]/40 transition-all duration-300">
                        <div className="p-4 bg-zinc-900 rounded-xl group-hover:bg-[#189eac]/10 transition-colors">
                            <FileText className="w-6 h-6 text-zinc-500 group-hover:text-[#189eac]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-200 group-hover:text-white transition-colors">Uniwersytet Jagielloński</h3>
                            <p className="text-xs text-zinc-500 mt-2 italic leading-relaxed">"Stronniczość polityczna telewizyjnych audycji informacyjnych..."</p>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
}