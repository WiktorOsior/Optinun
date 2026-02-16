import { useState, useEffect } from 'react';
import { articleService } from '../services/Api.ts';
import type {Article}  from "../interfaces/Article.ts";
import {Link} from "react-router-dom";
export default function HottestList() {
    const [articles, setarticles] = useState<Article[]>([]);
    const [unarticles, setunarticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getOrdered();
                setarticles(response.data);
                const response2 = await articleService.getUnique();
                setunarticles(response2.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch articles');
                setLoading(false);
                console.error(err);
            }
        };
        fetchArticles();
    }, []);
    if (loading) return <div className="flex h-screen items-center justify-center text-slate-400 text-xl font-medium">Loading articles...</div>
    if (error) return <div className="flex h-screen items-center justify-center text-red-500 text-xl font-medium">{error}</div>

    return (
        <div className="p-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr pb-8">
                {unarticles.length === 0 ? (
                    <p className="col-span-full text-center text-slate-400 text-lg">No articles found</p>
                ) : (
                    unarticles?.filter(
                        (unarticle) =>
                            articles.filter(
                                (article) =>
                                    article.cluster_id === unarticle.cluster_id).length > 1)
                        .map((article, index) => (
                            <div key={index} className="group">
                                <Link to={`/articles/${article.cluster_id}`}
                                      className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/10">
                                    <div className="relative">
                                        <img src={article.img} alt=""
                                             className={`h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105`}/>
                                        <div
                                            className="absolute bottom-2 right-2 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-slate-300 border border-slate-700 uppercase tracking-tight">
                                            {article.agency}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h2 className={` text-sm font-bold text-slate-100  group-hover:text-cyan-400 transition-colors`}>
                                            {article.title}
                                        </h2>
                                    </div>
                                </Link>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};