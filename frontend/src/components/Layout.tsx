import { Link, Outlet } from 'react-router-dom';
import { Search, X} from "lucide-react";
import { useState } from "react";
import SearchList from "./SearchList.tsx";

export default function Layout() {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 font-primary font-mainfont text-slate-200">
            <header className="sticky top-0 z-[60] w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
                <div className=" mx-auto px-4 h-16 flex items-center justify-between gap-4">

                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex-shrink-0 transition-transform active:scale-95">
                            <img src="/assets/logo-light.png" alt="Optinun" className="h-10 w-auto hover:cursor-pointer"/>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <div className="group flex justify-between gap-2 self-center">
                                <Link to="/articles"
                                      className="font-bold center hover:text-cyan-400 transition-colors">Articles</Link>
                                <Link to="/articles/hottest"
                                      className="center lg:hidden lg:group-hover:block hover:text-cyan-400 transition-colors">Hottest</Link>
                                <Link to="/articles/latest"
                                      className="enter lg:hidden lg:group-hover:block hover:text-cyan-400 transition-colors">Latest</Link>
                            </div>
                            <div className="items-center flex  ">
                                <Link to="/about"
                                      className=" text-slate-400font-bold center hover:text-cyan-400 transition-colors">About</Link>
                            </div>
                        </nav>

                    </div>

                    <div className="hidden lg:block flex-1 max-w-md">
                        <SearchList/>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            {isMobileSearchOpen ? <X className="w-5 h-5 text-cyan-500" /> : <Search className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {isMobileSearchOpen && (
                    <div className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                        <SearchList />
                    </div>
                )}
            </header>

            <main className=" mx-auto py-6 px-4">
                <Outlet />
            </main>

            <footer className="mt-auto border-t border-slate-900 py-8 text-center text-slate-600 text-sm">
                &copy; 2026 Optinun News.
            </footer>
        </div>
    );
}

