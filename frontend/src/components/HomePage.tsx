import {ArrowRight, Zap} from "lucide-react";
import {Link} from "react-router-dom";

export default function HomePage() {
    return(
            <div className="min-h-screen text-slate-50 selection:bg-indigo-500 selection:text-white">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:text-left">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                  </span>
                                Tracking 5 News Outlets Live
                            </div>
                            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                                Escape the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                    Media Echo Chamber
                                  </span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                We analyze hundreds of articles daily to show you exactly
                                <span className="text-white font-semibold"> who</span> is covering <span className="text-white font-semibold">what</span>.
                                See the bias in the volume, face-check the platforms, and decide for yourself.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/articles" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900">
                                    Explore Topics
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-750 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900">
                                    How it works
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                            <div className="relative rounded-2xl bg-slate-800/50 border border-slate-700 p-6 shadow-2xl backdrop-blur-sm">
                                <div className="flex items-start  gap-2 mb-6">
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                    <div className="text-xs font-mono text-slate-500">Live Analysis</div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-400">Right Leaning Outlets</span>
                                            <span className="text-red-400 font-mono">82% Vol</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-[82%] rounded-full"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-400">Left Leaning Outlets</span>
                                            <span className="text-blue-400 font-mono">18% Vol</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[18%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-slate-900/80 rounded-xl border border-slate-700 flex gap-4 items-start">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-200">Gap Detected</h4>
                                        <p className="text-xs text-slate-400 mt-1">Right-wing media is covering this topic 4x more than left-wing media today.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl -z-10 rounded-full opacity-30"></div>
                        </div>
                    </div>
                </main>
            </div>
        );
    };
