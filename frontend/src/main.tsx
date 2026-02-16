import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './style/style.css'
import NotFoundPage from "./components/NotFoundPage.tsx";
import ArticleList from "./components/ArticleList.tsx";
import ClusterList from "./components/ClusterList.tsx";
import Layout from "./components/Layout.tsx";
import HomePage from "./components/HomePage.tsx";
import HottestList from "./components/HottestList.tsx";
import LatestList from "./components/LatestList.tsx";
import AboutPage from "./components/AboutPage.tsx";

const router = createBrowserRouter([
    { path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage/>,
    children: [
        {
            index: true,
            element: <HomePage/>,
        },
        {
            path: '/articles',
            element: <ArticleList/>,
        },
        {
            path: '/articles/hottest',
            element: <HottestList/>,
        },
        {
            path: '/articles/latest',
            element: <LatestList/>,
        },
        {
            path: '/articles/:cluster_id',
            element:<ClusterList/>
        },
        {
            path: '/about',
            element:<AboutPage/>
        }
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
