import {FileText} from "lucide-react";

export default function AboutPage(){
    return (
        <div className="max-w-4xl mx-auto px-6 py-20">

            <div className="mb-16 border-l-4 border-cyan-500 pl-6">
                <h1 className="text-4xl font-extrabold text-white mb-4">How It Works</h1>
                <p className="text-lg text-slate-400">Transparency is core of this website. Here is exactly ho
                    media bias and coverage volume are measured here.</p>
            </div>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-cyan-400">01.</span> The Analysis Engine
                </h2>
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                    <p className="leading-relaxed text-slate-300 mb-4">
                        Every day, our automated scrapers process over 4000 headlines and descriptions. We use vector embeddings to
                        group them into semantic topics.
                    </p>
                    <p className="leading-relaxed text-slate-300">
                        We do not manually tag articles. The categorization is purely mathematical, based on the
                        semantic distance between the articles' descriptions.
                    </p>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="text-cyan-400">02.</span> The Source Selection
                </h2>

                <p className="text-slate-400 mb-8">
                    We track the top 5 most influential outlets across the political spectrum to ensure a balanced
                    comparison of narrative volume.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">

                    <div className="flex flex-col items-center gap-3 group">
                        <div
                            className="w-20 h-20 rounded-full border-4 border-blue-400 flex items-center justify-center shadow-lg shadow-blue-900/20 transition-transform group-hover:scale-105 bg-white">
                            <img src="/assets/onet.png" alt="ONET" className="rounded-full"/>
                        </div>
                        <span className="text-xs font-mono text-blue-400">Far Left</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group">
                        <div
                            className="w-20 h-20 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center shadow-lg shadow-blue-900/20 transition-transform group-hover:scale-105">
                            <img src="/assets/tvn.png" alt="TVN"/>
                        </div>
                        <span className="text-xs font-mono text-blue-200">Left Leaning</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group">
                        <div
                            className="w-20 h-20 rounded-full bg-white border-4 border-text flex items-center justify-center shadow-lg shadow-text/20 transition-transform group-hover:scale-105">
                            <img src="/assets/polsat.png" alt="POLSAT" className="rounded-full"/>
                        </div>
                        <span className="text-xs font-mono text-text">Center</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group">
                        <div
                            className="w-20 h-20 rounded-full bg-white border-4 border-red-300 flex items-center justify-center shadow-lg shadow-red-600/20 transition-transform group-hover:scale-105">
                            <img src="/assets/interia.png" alt="INTERIA" className="rounded-full"/>
                        </div>
                        <span className="text-xs font-mono text-red-300">Right Leaning</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group">
                        <div
                            className="w-20 h-20 rounded-full bg-white border-4 border-red-400 flex items-center justify-center shadow-lg shadow-red-900/20 transition-transform group-hover:scale-105">
                            <img src="/assets/wpolsce24.jpg" alt="WPOLSCE24" className="rounded-full"/>
                        </div>
                        <span className="text-xs font-mono text-red-400">Far Right</span>
                    </div>

                </div>

                <div className="bg-slate-800/30 border-l-2 border-slate-600 p-4 rounded-r-lg">
                    <p className="text-slate-300 text-sm">
                        <strong>Why Volume Matters:</strong> We compare the absolute number of articles published by
                        each outlet on a specific topic. If the "Right" publishes 50 articles on a topic while the
                        "Left" publishes only 5, it indicates an agenda-setting effort by one side, regardless of the
                        content's truth.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-cyan-400">03.</span> Bias Determination
                </h2>
                <p className="text-slate-400 mb-6">
                    We do not guess the political leaning of these outlets. Our classifications are strictly based on
                    third-party public perception surveys and academic media bias research.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <a href="https://www.umk.pl/wiadomosci/dokumenty/Kto_ma_przewage_w_polskim_dyskursie_medialnym_1691066362.pdf?fbclid=IwAR2vOuLsHJ95KEU7ssQDWtf72-VnlXx1AOmwNjzohEmcDWOaM9FeKezRkfA" target="_blank"
                       className="group flex items-start gap-4 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50 transition-all">
                        <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                            <FileText className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Uniwersytet Mikołaja Kopernika</h3>
                            <p className="text-sm text-slate-500 mt-1">"Kto ma przewagę w Polskim dyskursie medialnym"</p>
                        </div>
                    </a>

                    <a href="https://ruj.uj.edu.pl/entities/publication/cefb469c-5d75-49da-94d3-1cc2fb186d7a" target="_blank"
                       className="group flex items-start gap-4 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50 transition-all">
                        <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                            <FileText className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Uniwersytet Jagieloński</h3>
                            <p className="text-sm text-slate-500 mt-1">"Stronniczość polityczna telewizyjnych audycji informacyjnych w okresie parlamentarnej kampanii wyborczej w Polsce w 2023 r."</p>
                        </div>
                    </a>
                </div>
            </section>

        </div>
    );
}