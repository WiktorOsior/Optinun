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

    // Debouncing: czekamy aż użytkownik skończy pisać
    useEffect(() => {
        const timer = setTimeout(() => fetchArticles(input), 300);
        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Input wyszukiwarki */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={input}
                    className="block w-full pl-10 pr-10 py-2 border border-slate-700 rounded-xl leading-5 bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 sm:text-sm transition-all shadow-inner"
                    placeholder="Search news..."
                    onChange={(e) => setInput(e.target.value)}
                />
                {input && (
                    <button
                        onClick={() => {setInput(''); setArticles([]);}}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Wyniki wyszukiwania - Dropdown */}
            {articles.length !== 0 && (
                <div className="absolute left-0 right-0 mt-2 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl z-[100] max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800 mb-2">
                        Results for: <span className="text-cyan-500">{input}</span>
                    </div>

                    <div className="grid gap-2">
                        {articles.map((article, index) => (
                            <Link
                                key={index}
                                to={`/articles/${article.cluster_id}`}
                                onClick={() => {setArticles([]); setInput('');}}
                                className="flex gap-4 p-2 rounded-xl hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700 group"
                            >
                                <img
                                    src={article.img}
                                    alt=""
                                    className="w-20 h-20 object-cover rounded-lg bg-slate-800 flex-shrink-0"
                                />
                                <div className="flex flex-col justify-center overflow-hidden">
                                    <h3 className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                                        {article.title}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
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