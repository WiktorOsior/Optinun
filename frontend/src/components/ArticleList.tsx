import { useState, useEffect, useRef, useCallback } from 'react';
import { articleService } from '../services/Api.ts';
import type { Article } from "../interfaces/Article.ts";
import { Link } from "react-router-dom";
import {Calendar, Newspaper} from "lucide-react";

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

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastArticleRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await articleService.getFeed(page);
                const newArticles = response.data.content || [];

                setArticles(prev => {
                    const existingLinks = new Set(prev.map(a => a.link));
                    const uniqueNew = newArticles.filter((a: Article) => !existingLinks.has(a.link));
                    return [...prev, ...uniqueNew];
                });

                setHasMore(!response.data.last);
            } catch (err) {
                console.error("Error fetching articles:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [page]);

    return (
        <div className="max-w-screen-2xl mx-auto p-6 lg:p-8">

            <div className="mb-12 border-l-[3px] border-[#189eac] pl-8">
                <div className="flex items-center gap-2 mb-2">
                    <Newspaper className="w-5 h-5 text-[#189eac]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#189eac]">Comprehensive Feed</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">All Articles</h1>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                    Explore our full archive of semantic clusters. This feed contains every topic tracked across
                    monitored outlets, sorted to provide a complete view of the current media landscape.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                {articles.map((article, index) => {
                    const isLastElement = articles.length === index + 1;

                    return (
                        <div key={article.link} ref={isLastElement ? lastArticleRef : null} className="group h-full">
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
                    );
                })}
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <div
                        className="h-8 w-8 border-2 border-[#189eac]/20 border-t-[#189eac] rounded-full animate-spin shadow-[0_0_15px_rgba(24,158,172,0.2)]"></div>
                </div>
            )}
        </div>
    );
}