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
        const filteredRepositoryList = (repositoryList || []).filter(repository => repository.name.includes(searchText));
        setFilteredRepositoryList(filteredRepositoryList);
    }

    const repositoryContainer = () => (
        <div className="container">
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
        <div className="card">
            <li>
                <Link to={Navigation.repositoryDetail(repositoryDto.id)}>{repositoryDto.name}</Link>
                <span className="m-l-10 badge">{repositoryDto.visibility}</span>
                <p className="description">{repositoryDto.description}</p>
            </li>
            <div className="cardRow flex align-center flex-wrap gap-10">
                <span><GoCircle size={14} />{repositoryDto.language}</span>
                <span><GoStar size={14} />{repositoryDto.stargazers_count}</span>
                <span><GoRepoForked size={14} />{repositoryDto.forks_count}</span>
                <span><GoIssueOpened size={14} />{repositoryDto.open_issues_count}</span>
                <span><GoStopwatch size={14} />{repositoryDto.watchers_count}</span>
                <span>Updated on {formatDate(repositoryDto.updated_at)}</span>
            </div>
        </div>
    );

    const renderRepositories = () => {
        if (isRepositoryLoading) return 'Loading';
        if (Object.keys(filteredRepositoryList).length === 0) return <NoData />
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
        <section>
            <h3 className="flex align-center">
                <GoRepo size={16} />
                <span className="m-l-10">Repositories</span>
            </h3>
            {searchbar()}
            <div className="m-t-15">
                {renderRepositories()}
            </div>
        </section>
    )
}

export default GithubRepositoryListing;