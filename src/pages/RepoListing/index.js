import React, { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useRepoContext } from '../../context/RepoContext';
import { GoCircle, GoIssueOpened, GoRepo, GoRepoForked, GoStar, GoStopwatch } from "react-icons/go";
import { Link } from 'react-router-dom';
import { Navigation } from '../../routes/navigation';
import { formatDate } from '../../utils';
import { NoData } from '../../components/NoData';
import { Search } from '../../components/Search';
import './style.css';

export const GithubRepositoryListing = () => {
    const { isRepositoryLoading, repositoryList = {} } = useRepoContext();
    const [searchText, setSearchText] = useState('');
    const [filteredRepositoryList, setFilteredRepositoryList] = useState([]);

    useEffect(() => {
        setFilteredRepositoryList(repositoryList);
    }, [repositoryList])

    useEffect(() => {
        filterRepositories(searchText);
    }, [searchText])
    
    const filterRepositories = (searchText) => {
        const filteredRepositoryList = (repositoryList || []).filter(repository => 
            repository.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRepositoryList(filteredRepositoryList);
    }

    const repositoryContainer = () => (
        <div className="container" role="region" aria-labelledby="repo-heading">
            <ul className="list">
                <Virtuoso 
                    useWindowScroll
                    style={{ height: '100vh' }}
                    data={filteredRepositoryList}
                    itemContent={(_, item) => repositoryItem(item)}
                />
            </ul>
        </div>
    );

    const repositoryItem = (repositoryDto) => (
        <li className="card">
            <div className="cardRow flex align-center flex-wrap gap-10">
                <Link to={Navigation.repositoryDetail(repositoryDto.id)} aria-label={`View details for ${repositoryDto.name}`}>{repositoryDto.name}</Link>
                <span className="badge">{repositoryDto.visibility}</span>
            </div>
            <div className="cardRow flex align-center flex-wrap gap-10">
                <p className="description">{repositoryDto.description}</p>
            </div>
            <div className="cardRow flex align-center flex-wrap gap-10">
                <span><GoCircle size={14} aria-hidden="true" />{repositoryDto.language}</span>
                <span><GoStar size={14} aria-hidden="true" />{repositoryDto.stargazers_count}</span>
                <span><GoRepoForked size={14} aria-hidden="true" />{repositoryDto.forks_count}</span>
                <span><GoIssueOpened size={14} aria-hidden="true" />{repositoryDto.open_issues_count}</span>
                <span><GoStopwatch size={14} aria-hidden="true" />{repositoryDto.watchers_count}</span>
                <span>Updated on {formatDate(repositoryDto.updated_at)}</span>
            </div>
        </li>
    );

    const renderRepositories = () => {
        if (isRepositoryLoading) {
            return <div role="status" aria-live="polite">Loading...</div>;
        }
        if (filteredRepositoryList.length === 0) {
            return <div role="status" aria-live="polite"><NoData /></div>;
        }
        return repositoryContainer();
    };

    const handleSearch = (searchQuery) => {
        setSearchText(searchQuery);
    }

    const searchbar = () => (
        <Search
            placeholder="Find a repository..."
            value={searchText}
            callback={handleSearch}
        />
    )

    return (
        <main id="main-content">
            <h1 id="repo-heading" className="flex align-center">
                <GoRepo size={16} aria-hidden="true" />
                <span className="m-l-10">Repositories ({filteredRepositoryList.length || 0})</span>
            </h1>
            {searchbar()}
            <div className="m-t-15">
                {renderRepositories()}
            </div>
        </main>
    )
}

export default GithubRepositoryListing;