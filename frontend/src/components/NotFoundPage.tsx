import {Link} from 'react-router-dom';
export default function NotFoundPage() {
    return(
    <body className="h-screen bg-slate-900 text-stone-200">
        <h1>404 Page not found </h1>
        <Link to="/">Go to Home</Link>
    </body>);
}