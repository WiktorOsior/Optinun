import { useState, useEffect } from 'react';
import { articleService } from '../services/Api.ts';
import type { Article } from "../interfaces/Article.ts";
import { useParams } from "react-router";
import {Activity, Zap, BarChart3, Calendar} from "lucide-react";
import { Link } from "react-router-dom";

export default function ClusterList() {
    const params = useParams<{ cluster_id: string }>();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [count, setCount] = useState<number[]>([]);
    const [max, setMax] = useState<number>(0);

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return dateString; // Fallback if date is invalid
        }
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getCluster(parseInt(params.cluster_id!));
                setArticles(response.data);
                setLoading(false);
                const c: number[] = [0, 0, 0, 0, 0];
                response.data.forEach((article: Article) => {
                    const agency = article.agency?.toUpperCase();
                    if (agency === 'ONET') c[0] += 1;
                    else if (agency === 'TVN') c[1] += 1;
                    else if (agency === 'POLSAT') c[2] += 1;
                    else if (agency === 'INTERIA') c[3] += 1;
                    else if (agency === 'WPOLSCE24') c[4] += 1;
                });
                const m = Math.max(...c, 1);
                setCount(c);
                setMax(m);
            } catch (err) {
                setError('Failed to fetch articles');
                setLoading(false);
                console.error(err);
            }
        };
        fetchArticles();
    }, [params.cluster_id]);

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <div className="h-8 w-8 border-2 border-[#189eac]/20 border-t-[#189eac] rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="flex h-[60vh] items-center justify-center text-rose-500 text-lg font-medium tracking-tight">
            {error}
        </div>
    );

    const totalLR = count[0] + count[1] + count[3] + count[4];
    const leftPerc = totalLR > 0 ? ((count[0] + count[1]) / totalLR) * 100 : 0;
    const rightPerc = totalLR > 0 ? ((count[3] + count[4]) / totalLR) * 100 : 0;

    const agencies = [
        { name: 'Onet', count: count[0], color: 'bg-blue-500', logo: '/assets/onet.png' },
        { name: 'TVN', count: count[1], color: 'bg-blue-300', logo: '/assets/tvn.png' },
        { name: 'Polsat', count: count[2], color: 'bg-zinc-400', logo: '/assets/polsat.png' },
        { name: 'Interia', count: count[3], color: 'bg-rose-300', logo: '/assets/interia.png' },
        { name: 'wPolsce24', count: count[4], color: 'bg-rose-500', logo: '/assets/wpolsce24.jpg' }
    ];

    const gridLines = Array.from({ length: max + 1 }, (_, i) => max - i);

    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-8 w-full min-h-screen bg-zinc-950 font-primary p-6">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="lg:col-span-7 lg:h-screen lg:overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-start pb-20">
                    {articles.map((article, index) => (
                        <div key={index} className={`${index === 0 ? "md:col-span-2" : "col-span-1"} group`}>
                            <Link
                                to={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col h-full rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#189eac]/40 hover:bg-white/[0.05] hover:shadow-[0_0_20px_-5px_rgba(24,158,172,0.2)]"
                            >
                                <div className="relative overflow-hidden aspect-video lg:aspect-auto">
                                    <img
                                        src={article.img}
                                        alt=""
                                        className={`${index === 0 ? "h-80" : "h-44"} w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                                    <div className="absolute bottom-3 right-3 bg-[#189eac]/10 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest text-[#189eac] border border-[#189eac]/20 uppercase z-10">
                                        {article.agency}
                                    </div>
                                </div>
                                <div className="p-6 relative z-10">
                                    <div
                                        className="flex items-center gap-1.5 text-zinc-500 text-[10px] mb-3 uppercase tracking-wider font-semibold">
                                        <Calendar className="w-3 h-3 text-[#189eac]/60"/>
                                        {formatDate(article.pubdate)}
                                    </div>
                                    <h2 className={`${index === 0 ? "text-2xl font-mainfont" : "text-sm"} font-bold text-zinc-300 leading-snug line-clamp-2 group-hover:text-white transition-colors duration-300`}>
                                        {article.title}
                                    </h2>
                                    <div
                                        className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-tighter text-zinc-500 font-bold group-hover:text-[#189eac] transition-colors">
                                        Source Document
                                        <div
                                            className="h-px flex-grow bg-zinc-800 group-hover:bg-[#189eac]/30 transition-colors"/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-0 h-fit">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-between items-start mb-10">
                        <h3 className="text-[#189eac] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <BarChart3 className="w-4 h-4"/> Source Distribution
                        </h3>
                        <span className="text-zinc-500 text-[10px] font-mono tracking-tighter uppercase">{articles.length} total</span>
                    </div>

                    <div className="relative h-64 w-full flex justify-around items-end">
                        <div
                            className="absolute inset-x-0 bottom-14 top-0 flex flex-col justify-between pointer-events-none">
                            {gridLines.map((v) => (
                                <div key={v} className="w-full border-t border-white/[0.05] relative">
                                    <span className="absolute -top-2 -left-6 text-[8px] text-zinc-600 font-mono">{v}</span>
                                </div>
                            ))}
                        </div>

                        {agencies.map((agency, i) => (
                            <div key={i} className="relative flex flex-col items-center group w-12 h-full justify-end">
                                <div className="flex-1 w-full mb-14 flex items-end justify-center relative">
                                    <div
                                        className={`w-8 ${agency.color} rounded-t-sm transition-all duration-700 ease-out shadow-lg group-hover:brightness-110`}
                                        style={{height: agency.count > 0 ? `${(agency.count / max) * 100}%` : '2px'}}
                                    />
                                </div>
                                <div className="absolute bottom-0 flex flex-col items-center gap-2">
                                    <div className="h-8 w-8 bg-white p-1 rounded-lg shadow-sm border border-zinc-200">
                                        <img src={agency.logo} className="w-full h-full object-contain" alt=""/>
                                    </div>
                                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-tighter">{agency.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Live Volume Analysis</div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between text-[11px] mb-2">
                                <span className="text-zinc-400 font-medium">Liberal Outlets</span>
                                <span className="text-blue-400 font-mono font-bold">{Math.round(leftPerc)}% Vol</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000" style={{width: `${leftPerc}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-[11px] mb-2">
                                <span className="text-zinc-400 font-medium">Conservative Outlets</span>
                                <span className="text-rose-400 font-mono font-bold">{Math.round(rightPerc)}% Vol</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-1000" style={{width: `${rightPerc}%`}}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        {(count[0] + count[1]) > (count[3] + count[4]) && (
                            <div className="p-4 bg-[#189eac]/5 border border-[#189eac]/20 rounded-xl flex gap-4 items-center">
                                <Zap className="w-5 h-5 text-[#189eac]"/>
                                <div>
                                    <h4 className="font-bold text-[10px] text-zinc-200 tracking-tight">Gap Detected</h4>
                                    <p className="text-[9px] text-zinc-500 ">Liberal media is providing significantly more coverage on this topic today.</p>
                                </div>
                            </div>
                        )}

                        {(count[3] + count[4]) > (count[1] + count[0]) && (
                            <div className="p-4 bg-[#189eac]/5 border border-[#189eac]/20 rounded-xl flex gap-4 items-center">
                                <Zap className="w-5 h-5 text-[#189eac]"/>
                                <div>
                                    <h4 className="font-bold text-[10px] text-zinc-200 tracking-tight">Gap Detected</h4>
                                    <p className="text-[9px] text-zinc-500 ">Conservative media is providing significantly more coverage on this topic today.</p>
                                </div>
                            </div>
                        )}

                        {totalLR > 0 && (count[0] + count[1]) === (count[3] + count[4]) && (
                            <div className="p-4 bg-zinc-800/30 rounded-xl border border-white/[0.05] flex gap-4 items-center">
                                <Activity className="w-5 h-5 text-zinc-400"/>
                                <div>
                                    <h4 className="font-bold text-[10px] text-zinc-200 uppercase tracking-tight">Balanced</h4>
                                    <p className="text-[9px] text-zinc-500 uppercase">Equal coverage across the spectrum.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}