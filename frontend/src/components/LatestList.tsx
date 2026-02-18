import { useState, useEffect } from 'react';
import { articleService } from '../services/Api.ts';
import type { Article } from "../interfaces/Article.ts";
import { Link } from "react-router-dom";
import {Calendar, Clock} from "lucide-react";

export default function LatestList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return dateString;
        }
    };

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await articleService.getLatest();
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch latest articles');
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <div className="h-8 w-8 border-2 border-[#189eac]/20 border-t-[#189eac] rounded-full animate-spin shadow-[0_0_15px_rgba(24,158,172,0.2)]"></div>
        </div>
    );

    if (error) return (
        <div className="flex h-[60vh] items-center justify-center text-rose-500 text-lg font-medium tracking-tight">
            {error}
        </div>
    );

    return (
        <div className="max-w-screen-2xl mx-auto p-6 lg:p-8">
            <div className="mb-12 border-l-[3px] border-[#189eac] pl-8">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#189eac]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#189eac]">Real-Time Updates</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Latest Articles</h1>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                    The top 36 most recent stories across all monitored platforms.
                    This feed is updated in real-time to reflect the newest semantic clusters as they emerge.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                {articles.map((article, index) => (
                    <div key={index} className="group h-full">
                        <Link
                            to={`/articles/${article.cluster_id}`}
                            className="flex flex-col h-full rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#189eac]/40 hover:bg-white/[0.05] hover:shadow-[0_0_20px_-5px_rgba(24,158,172,0.2)] hover:translate-y-[-4px]"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.img || 'https://via.placeholder.com/300'}
                                    alt=""
                                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />

                                {index < 5 && (
                                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#189eac] rounded-md shadow-[0_0_10px_rgba(24,158,172,0.5)] z-10 animate-pulse">
                                        <span className="w-1 h-1 rounded-full bg-white"></span>
                                        <span className="text-[9px] font-black text-white uppercase tracking-tighter">New</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

                                {article.agency && (
                                    <div className="absolute bottom-3 right-3 bg-[#189eac]/10 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest text-[#189eac] border border-[#189eac]/20 uppercase">
                                        {article.agency}
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex-grow flex flex-col justify-between relative">
                                <div
                                    className="flex items-center gap-1.5 text-zinc-500 text-[10px] mb-3 uppercase tracking-wider font-semibold">
                                    <Calendar className="w-3 h-3 text-[#189eac]/60"/>
                                    {formatDate(article.pubdate)}
                                </div>
                                <h2 className="text-sm font-medium leading-relaxed text-zinc-300 group-hover:text-white transition-colors duration-300 line-clamp-3">
                                    {article.title}
                                </h2>
                                <div
                                    className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-tighter text-zinc-500 font-bold group-hover:text-[#189eac] transition-colors">
                                    View Comparison
                                    <div
                                        className="h-px flex-grow bg-zinc-800 group-hover:bg-[#189eac]/30 transition-colors"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}