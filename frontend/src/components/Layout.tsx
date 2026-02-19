import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import SearchList from "./SearchList.tsx";

export default function Layout() {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsMobileSearchOpen(false);
            setIsMobileMenuOpen(false);
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [location]);

    const navItems = [
        { name: 'Articles', path: '/articles' },
        { name: 'Hottest', path: '/articles/hottest' },
        { name: 'Latest', path: '/articles/latest' },
        { name: 'About', path: '/about' }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 font-primary font-mainfont text-zinc-200 flex flex-col">
            <header className="sticky top-0 z-[60] w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16 gap-4">
                        <Link to="/" className="flex-shrink-0">
                            <img src="/assets/logo-light.png" alt="Optinun" className="h-10 w-auto"/>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium h-16">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="relative group h-full flex items-center text-zinc-400 hover:text-zinc-100 transition-colors font-bold uppercase"
                                >
                                    {item.name}
                                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#189eac] transition-transform duration-300 origin-center ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden lg:block flex-1 max-w-sm ml-auto">
                            <SearchList/>
                        </div>

                        <div className="flex items-center gap-1 lg:hidden">
                            <button
                                onClick={() => {
                                    setIsMobileSearchOpen(!isMobileSearchOpen);
                                    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                                }}
                                className={`p-2 rounded-md transition-colors ${isMobileSearchOpen ? 'text-[#189eac] bg-[#189eac]/10' : 'text-zinc-400'}`}
                            >
                                {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(!isMobileMenuOpen);
                                    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
                                }}
                                className={`p-2 rounded-md transition-colors ${isMobileMenuOpen ? 'text-[#189eac] bg-[#189eac]/10' : 'text-zinc-400'}`}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileSearchOpen && (
                    <div className="lg:hidden px-4 pb-4 border-b border-zinc-900 bg-zinc-950 animate-in slide-in-from-top-2 duration-200">
                        <SearchList />
                    </div>
                )}

                {isMobileMenuOpen && (
                    <nav className="lg:hidden bg-zinc-950 border-b border-zinc-900 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col p-4 gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center h-12 px-4 rounded-lg text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                                        location.pathname === item.path
                                            ? 'bg-[#189eac]/10 text-[#189eac]'
                                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </header>

            <main className="flex-grow w-full max-w-screen-2xl mx-auto py-8 px-4 sm:px-6">
                <Outlet />
            </main>

            <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-10 text-center text-zinc-600 text-xs tracking-wide">
                &copy; 2026 Optinun News. All rights reserved.
            </footer>
        </div>
    );
}