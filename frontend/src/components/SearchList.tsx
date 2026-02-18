import { useState, useEffect, useRef } from 'react';
import { articleService } from '../services/Api.ts';
import type { Article } from "../interfaces/Article.ts";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [input, setInput] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchArticles = async (value: string) => {
        if (value.length < 3) {
            setArticles([]);
            return;
        }
        try {
            const response = await articleService.getSimilar(value);
            setArticles(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchArticles(input), 300);
        return () => clearTimeout(timer);
    }, [input]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setArticles([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-[#189eac] transition-colors" />
                </div>
                <input
                    type="text"
                    value={input}
                    className="block w-full pl-10 pr-10 py-2.5 border border-white/[0.05] rounded-xl leading-5 bg-white/[0.03] backdrop-blur-md text-zinc-200 placeholder-zinc-500 transition-all duration-300 focus:outline-none
                    hover:bg-white/[0.08] hover:border-[#189eac]/40 hover:shadow-[0_0_15px_-5px_rgba(24,158,172,0.4)]
                    focus:ring-1 focus:ring-[#189eac]/40 focus:border-[#189eac]/40 focus:bg-white/[0.08]"
                    placeholder="Search news..."
                    onChange={(e) => setInput(e.target.value)}
                />
                {input && (
                    <button
                        onClick={() => {setInput(''); setArticles([]);}}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-200 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {articles.length !== 0 && (
                <div className="absolute left-0 right-0 mt-3 p-2 bg-zinc-950/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-[100] max-h-[32rem] overflow-y-auto no-scrollbar">
                    <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] border-b border-white/[0.05] mb-2 flex justify-between items-center">
                        <span>Results for: <span className="text-zinc-200">{input}</span></span>
                        <span className="text-[#189eac] opacity-60">{articles.length} items</span>
                    </div>

                    <div className="grid gap-1.5">
                        {articles.map((article, index) => (
                            <Link
                                key={index}
                                to={`/articles/${article.cluster_id}`}
                                onClick={() => {setArticles([]); setInput('');}}
                                className="flex gap-4 p-2.5 rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:bg-white/[0.05] hover:border-[#189eac]/40 hover:shadow-[0_0_15px_-5px_rgba(24,158,172,0.3)] hover:translate-x-1 group"
                            >
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <img
                                        src={article.img}
                                        alt=""
                                        className="w-full h-full object-cover rounded-lg bg-zinc-800 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
                                </div>

                                <div className="flex flex-col justify-center overflow-hidden">
                                    <h3 className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-snug">
                                        {article.title}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-[9px] px-2 py-0.5 rounded bg-[#189eac]/10 text-[#189eac] border border-[#189eac]/20 uppercase tracking-wider font-bold group-hover:bg-[#189eac]/20 transition-all">
                                            {article.agency}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}