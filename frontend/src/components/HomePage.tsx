import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-[#189eac]/30 selection:text-white">
            <main className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:text-left">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#189eac]/10 border border-[#189eac]/20 text-[#189eac] text-xs font-bold uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#189eac] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#189eac]"></span>
                            </span>
                            Tracking 5 News Outlets Live
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                            Escape the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#189eac] to-zinc-400">
                                Media Echo Chamber
                            </span>
                        </h1>

                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            We analyze hundreds of articles daily to show you exactly
                            <span className="text-zinc-100 font-semibold"> who</span> is covering <span className="text-zinc-100 font-semibold">what</span>.
                            See the bias in the volume, fact-check the platforms, and decide for yourself.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/articles" className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-[#189eac] rounded-xl hover:bg-[#158a96] hover:shadow-[0_0_20px_rgba(24,158,172,0.3)] focus:outline-none focus:ring-2 focus:ring-[#189eac] focus:ring-offset-2 focus:ring-offset-zinc-950">
                                Explore Topics
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-zinc-300 transition-all duration-300 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500">
                                How it works
                            </Link>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 shadow-2xl backdrop-blur-md">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Real-Time Distribution</div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-zinc-400 font-medium">Liberal Outlets</span>
                                        <span className="text-blue-400 font-mono font-bold">18% Vol</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[18%] rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-zinc-400 font-medium">Conservative Outlets</span>
                                        <span className="text-rose-400 font-mono font-bold">82% Vol</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-rose-600 to-rose-400 w-[82%] rounded-full"></div>
                                    </div>
                                </div>


                            </div>

                            <div
                                className="mt-8 p-4 bg-[#189eac]/5 rounded-xl border border-[#189eac]/20 flex gap-4 items-start transition-all hover:bg-[#189eac]/10">
                                <div className="p-2 bg-[#189eac]/20 rounded-lg text-[#189eac]">
                                    <Zap className="w-5 h-5"/>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-zinc-200">Gap Detected</h4>
                                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                                        Conservative media is providing significantly more coverage on this topic today.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-[#189eac]/10 blur-3xl -z-10 rounded-full opacity-20"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};