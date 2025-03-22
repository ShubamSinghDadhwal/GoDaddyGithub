import { Route, Routes } from 'react-router-dom';
import GithubRepositoryListing from '../pages/RepoListing';
import { GithubRepositoryDetail } from '../pages/RepoDetail';

export const PATH = {
    HOME: '/',
}

const getRoutePath = () => {
    const routes = {};
    routes[PATH.HOME] = { page: GithubRepositoryListing };
    routes[`${PATH.HOME}repository/:repositoryId`] = { page: GithubRepositoryDetail };
    return routes;
}

export const Router = () => {
    const routes = getRoutePath();
    
    const getRoutes = () => {
        const temp = Object.keys(routes).map(route => {
            const { page: Page } = routes[route];
            return <Route key={route} path={route} element={<Page />} />
        })
        return temp;
    }

    return (
        <Routes>
            {getRoutes()}    
        </Routes>
    )
};
