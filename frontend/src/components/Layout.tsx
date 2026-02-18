import { Link, Outlet } from 'react-router-dom';
import { Search, X } from "lucide-react";
import { useState } from "react";
import SearchList from "./SearchList.tsx";

export default function Layout() {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 font-primary font-mainfont text-zinc-200 flex flex-col">
            <header className="sticky top-0 z-[60] w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/60">

                <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
                            <img src="/assets/logo-light.png" alt="Optinun" className="h-10 w-auto hover:cursor-pointer"/>
                        </Link>

                        <nav className="flex items-center gap-6">
                            <div className="flex items-center gap-6 text-sm font-medium h-16">
                                {[
                                    { name: 'Articles', path: '/articles' },
                                    { name: 'Hottest', path: '/articles/hottest' },
                                    { name: 'Latest', path: '/articles/latest' },
                                    { name: 'About', path: '/about' }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="relative group h-full flex items-center text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#189eac] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>

                    <div className="hidden lg:block flex-1 max-w-sm">
                        <SearchList/>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-all duration-200"
                        >
                            {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {isMobileSearchOpen && (
                    <div className="lg:hidden px-4 pb-4 border-b border-zinc-900 bg-zinc-950 animate-in slide-in-from-top-1 fade-in duration-200">
                        <div className="pt-2">
                            <SearchList />
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-grow w-full max-w-screen-2xl mx-auto py-8 px-6">
                <Outlet />
            </main>

            <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-10 text-center text-zinc-600 text-xs tracking-wide">
                &copy; 2026 Optinun News. All rights reserved.
            </footer>
        </div>
    );
}