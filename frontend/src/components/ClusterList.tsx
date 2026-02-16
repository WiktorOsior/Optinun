import { useState, useEffect } from 'react';
import { articleService } from '../services/Api.ts';
import type {Article} from "../interfaces/Article.ts";
import {useParams} from "react-router";
import {Activity, Zap} from "lucide-react";
import {Link} from "react-router-dom";
export default function ClusterList () {
    const params = useParams<{cluster_id : string}>();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [count, setCount] = useState<number[]>([]);
    const [max,setMax] = useState<number>(0);
    useEffect(() => {
        const fetchArticles = async () => {
            try {

                const response = await articleService.getCluster(parseInt(params.cluster_id!));
                setArticles(response.data);
                setLoading(false);
                const c : number[] = [0,0,0,0,0];
                let m : number = 0;
                response.data.map((article: Article) => {
                    if(article.agency === 'ONET') {
                        c[0] += 1;
                        if(c[0] > m) m=c[0]
                    }
                    if(article.agency === 'TVN') {
                        c[1] += 1;
                        if(c[1] > m) m=c[1]
                    }
                    if(article.agency === 'POLSAT') {
                        c[2] += 1;
                        if(c[2] > m) m=c[2]
                    }
                    if(article.agency === 'INTERIA') {
                        c[3] += 1;
                        if(c[3] > m) m=c[3]
                    }
                    if(article.agency === 'WPOLSCE24') {
                        c[4] += 1;
                        if(c[4] > m) m=c[4]
                    }
                });
                setCount(c);
                setMax(m);
            } catch (err) {
                setError('Failed to fetch articles');
                setLoading(false);
                console.error(err);
            }
        };
        fetchArticles();
    }, []);
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div
            className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-6 w-full min-h-screen bg-slate-950 font-primary">
            <div className="lg:col-span-7 p-4 lg:h-screen lg:overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
                    {articles.map((article, index) => (
                        <div key={index} className={`${index === 0 ? "md:col-span-2" : "col-span-1"} group`}>
                            <Link to={`/articles/${article.cluster_id}`} className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/10">
                                <div className="relative">
                                    <img src={article.img} alt=""
                                         className={`${index === 0 ? "h-72" : "h-40"} w-full object-cover transition-transform duration-500 group-hover:scale-105`}/>
                                    <div
                                        className="absolute bottom-2 right-2 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-slate-300 border border-slate-700 uppercase tracking-tight">
                                        {article.agency}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className={`${index === 0 ? "text-xl font-mainfont" : "text-sm"} font-bold text-slate-100 leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors`}>
                                        {article.title}
                                    </h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-5 p-4 space-y-6 lg:sticky lg:top-0 h-fit">
                <div className="flex flex-col gap-2 border border-slate-700 bg-slate-800/50 rounded-2xl h-fit p-6 ">
                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-cyan-500"/> Source Distribution
                        </h3>
                    <div
                        className=" flex justify-around items-end h-64 w-full">
                        <div className=" w-fit h-full flex flex-col items-center justify-end">
                            <div className="w-10 bg-blue-400 rounded-t-xl"
                                 style={{height: `${count[0] !== 0 ? `${count[0] / max * 100}% ` : 'auto'}`}}/>
                            <div
                                className="w-fit bg-blue-400 rounded-b-xl flex flex-col items-center justify-end h-auto"
                                style={{
                                    borderTopRightRadius: count[0] === 0 ? '0.75rem' : undefined,
                                    borderTopLeftRadius: count[0] === 0 ? '0.75rem' : undefined
                                }}>
                                <p className="text-center">{count[0]}</p>
                                <div
                                    className="h-8 w-8 m-1 rounded-xl bg-white flex flex-col items-center justify-center">
                                    <img src="/assets/onet.png" alt="ONET"
                                         className="w-8 h-auto rounded-xl"/>
                                </div>
                            </div>
                        </div>
                        <div className=" w-fit h-full flex flex-col items-center justify-end">
                            <div className="w-10 bg-blue-200 rounded-t-xl"
                                 style={{height: `${count[1] !== 0 ? `${count[1] / max * 100}% ` : 'auto'}`}}/>
                            <div
                                className="w-fit bg-blue-200 rounded-b-xl flex flex-col items-center justify-end h-auto"
                                style={{
                                    borderTopRightRadius: count[1] === 0 ? '0.75rem' : undefined,
                                    borderTopLeftRadius: count[1] === 0 ? '0.75rem' : undefined
                                }}>
                                <p className="text-center">{count[1]}</p>
                                <div className="h-8 w-8 m-1 rounded-xl bg-white">
                                    <img src="/assets/tvn.png" alt="ONET"
                                         className="w-8 h-auto rounded-xl"/>
                                </div>
                            </div>
                        </div>
                        <div className=" w-fit h-full flex flex-col items-center justify-end">
                            <div className="h-full flex flex-col items-center justify-end">
                                <div className="w-10 bg-text rounded-t-xl"
                                     style={{height: `${count[2] !== 0 ? `${count[2] / max * 100}% ` : 'auto'}`}}/>
                            </div>
                            <div
                                className="w-fit bg-text rounded-b-xl flex flex-col items-center justify-end h-auto"
                                style={{
                                    borderTopRightRadius: count[2] === 0 ? '0.75rem' : undefined,
                                    borderTopLeftRadius: count[2] === 0 ? '0.75rem' : undefined
                                }}>
                                <p className="text-center">{count[2]}</p>
                                <div className="h-8 w-8 m-1 rounded-xl bg-white">
                                    <img src="/assets/polsat.png" alt="ONET"
                                         className="w-8 h-auto rounded-xl"/>
                                </div>
                            </div>
                        </div>
                        <div className=" w-fit h-full flex flex-col items-center justify-end">
                            <div className="h-full flex flex-col items-center justify-end">
                                <div className="w-10 bg-red-300 rounded-t-xl"
                                     style={{height: `${count[3] !== 0 ? `${count[3] / max * 100}% ` : 'auto'}`}}/>
                            </div>
                            <div
                                className="w-fit bg-red-300 rounded-b-xl flex flex-col items-center justify-end h-auto"
                                style={{
                                    borderTopRightRadius: count[3] === 0 ? '0.75rem' : undefined,
                                    borderTopLeftRadius: count[3] === 0 ? '0.75rem' : undefined
                                }}>
                                <p className="text-center">{count[3]}</p>
                                <div
                                    className="h-8 w-8 m-1 rounded-xl bg-white flex flex-col items-center justify-center">
                                    <img src="/assets/interia.png" alt="ONET"
                                         className="w-8 h-auto rounded-xl"/>
                                </div>
                            </div>
                        </div>
                        <div className=" w-fit h-full flex flex-col items-center justify-end">
                            <div className="h-full flex flex-col items-center justify-end">
                                <div className="w-10 bg-red-400 rounded-t-xl"
                                     style={{height: `${count[4] !== 0 ? `${count[4] / max * 100}% ` : 'auto'}`}}/>
                            </div>
                            <div
                                className="w-fit bg-red-400 rounded-b-xl flex flex-col items-center justify-end h-auto"
                                style={{
                                    borderTopRightRadius: count[4] === 0 ? '0.75rem' : undefined,
                                    borderTopLeftRadius: count[4] === 0 ? '0.75rem' : undefined
                                }}>
                                <p className="text-center">{count[4]}</p>
                                <div
                                    className="h-8 w-8 m-1 rounded-xl bg-white flex flex-col items-center justify-center">
                                    <img src="/assets/wpolsce24.jpg" alt="ONET"
                                         className="w-8 h-auto rounded-xl"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-full lg:max-w-none">
                    <div
                        className="relative rounded-2xl bg-slate-800/50 border border-slate-700 p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex items-start  gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            <div className="text-xs font-mono text-slate-400 text-xs font-bold uppercase">Live Analysis</div>
                    </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Left Leaning Outlets</span>
                                    <span
                                        className="text-blue-400 font-mono">{((count[0] + count[1]) / (count[0] + count[1] + count[3] + count[4])) * 100}% Vol</span>
                                </div>
                                <div className="h-4 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400  rounded-full"
                                        style={{width: `${((count[0] + count[1]) / (count[0] + count[1] + count[3] + count[4])) * 100}%`}}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Right Leaning Outlets</span>
                                    <span
                                        className="text-red-400 font-mono">{((count[3] + count[4]) / (count[0] + count[1] + count[3] + count[4])) * 100}% Vol</span>
                                </div>
                                <div className="h-4 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                                        style={{width: `${((count[3] + count[4]) / (count[0] + count[1] + count[3] + count[4])) * 100}%`}}></div>
                                </div>
                            </div>


                        </div>
                        <div
                            className="mt-6 p-4 bg-slate-900/80 rounded-xl border border-slate-700 flex gap-4 items-start"
                            style={{display: `${(count[0] + count[1]) > (count[3] + count[4]) ? 'flex' : 'none'}`}}>
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <Zap className="w-5 h-5"/>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-200">Gap Detected</h4>
                                <p className="text-xs text-slate-400 mt-1">Left-wing media is covering this topic
                                    more than right-wing media today.</p>
                            </div>
                        </div>
                        <div
                            className="mt-6 p-4 bg-slate-900/80 rounded-xl border border-slate-700 flex gap-4 items-start"
                            style={{display: `${(count[3] + count[4]) > (count[1] + count[0]) ? 'flex' : 'none'}`}}>
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <Zap className="w-5 h-5"/>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-200">Gap Detected</h4>
                                <p className="text-xs text-slate-400 mt-1">Right-wing media is covering this topic
                                    more than left-wing media today.</p>
                            </div>
                        </div>
                        <div
                            className="mt-6 p-4 bg-slate-900/80 rounded-xl border border-slate-700 flex gap-4 items-start"
                            style={{display: `${(count[0] + count[1]) == (count[3] + count[4]) ? 'flex' : 'none'}`}}>
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <Zap className="w-5 h-5"/>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-200">No Gap Detected</h4>
                                <p className="text-xs text-slate-400 mt-1">This topic is covered similarly by both
                                    sides.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
