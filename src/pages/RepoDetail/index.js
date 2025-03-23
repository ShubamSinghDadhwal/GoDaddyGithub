import React, { useEffect, useState } from 'react';
import { useRepoContext } from '../../context/RepoContext';
import { Link, useParams } from 'react-router-dom';
import { GoEye, GoIssueOpened, GoLaw, GoRepoForked, GoStar } from 'react-icons/go';
import { request } from '../../utils';
import { NoData } from '../../components/NoData';
import './style.css';

export const GithubRepositoryDetail = () => {
    const { repositoryId = '' } = useParams();
    const { getCurrentRepository, isRepositoryLoading } = useRepoContext();
    const currentRepository = getCurrentRepository(repositoryId) || {};
    
    const [repoContributorList, setRepoContributorList] = useState([]);
    const [repoLanguagesUrl, setRepoLanguagesUrl] = useState({})
    const [isLoading, setIsLoading] = useState({
        contributors: false,
        languages: false,
    });

    useEffect(() => {
        if (currentRepository?.languages_url) fetchRepoLanguages();
        if (currentRepository?.contributors_url) fetchRepoContributors();
    }, [currentRepository]);

    if (isRepositoryLoading) return <p>Loading repository details...</p>;
    if (!Object.keys(currentRepository).length) return <p>Repository not found</p>;

    const fetchRepoContributors = async () => {
        const baseUrl = currentRepository?.contributors_url;
        const options = { method: "GET" };
        setIsLoading(prevIsLoading => ({
            ...prevIsLoading,
            contributors: true,
        }))
        try {
            const contributors = await request(baseUrl, options);
            setRepoContributorList(contributors);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(prevIsLoading => ({
                ...prevIsLoading,
                contributors: false,
            }))
        }
    };

    const fetchRepoLanguages = async () => {
        const baseUrl = currentRepository?.languages_url;
        const options = { method: "GET" };
        setIsLoading(prevIsLoading => ({
            ...prevIsLoading,
            languages: true,
        }))
        try {
            const languages = await request(baseUrl, options);
            setRepoLanguagesUrl(languages);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(prevIsLoading => ({
                ...prevIsLoading,
                languages: false,
            }))
        }
    };

    const renderContributors = () => {
        if (isLoading.contributors) return 'Loading...'
        if (repoContributorList.length === 0) return <NoData />
        return repoContributorList.map(contributor);
    };
    const contributor = (contributorDto) => (
        <Link
            className="flex align-center gap-10 m-r-5 m-b-10"
            to={contributorDto?.html_url}
            target="_blank"
            // following added for security
            rel="noopener noreferrer"
        >
            <img className="contributor-image" width={20} height={20} src={contributorDto?.avatar_url} alt="contributor-image"/>
            <span>{contributorDto?.login}</span>
        </Link>
    );

    const renderLanguages = () => {
        if (isLoading.languages) return <p role="status" aria-live="polite">Loading...</p>;
        if (Object.keys(repoLanguagesUrl).length === 0) return <NoData role="status" aria-live="polite" />;
        return Object.keys(repoLanguagesUrl).map(language);
    };
    const language = (language) => <div className="m-t-10">{language}</div>

    return (
        <main id="main-content" className="repo-detail-container" aria-labelledby="repo-heading">
            <h1>
                <Link 
                    id="repo-heading"
                    to={currentRepository.html_url}
                    target="_blank"
                    // following added for security
                    rel="noopener noreferrer"
                >{currentRepository.name}</Link>
            </h1>
            <section className="section-seperator m-t-15">
                <h2 className="m-t-15">About</h2>
                <p>{currentRepository.description}</p>
                <div>
                    <Link
                        className="flex align-center gap-10 m-t-15"
                        to={currentRepository.license?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GoLaw size={14} aria-hidden="true" />
                        {currentRepository.license?.name}
                    </Link>
                    <Link 
                        className="flex align-center gap-10 m-t-15"
                        to={currentRepository.stargazers_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GoStar size={14} aria-hidden="true" />
                        {currentRepository.stargazers_count} stars
                    </Link>
                    <Link 
                        className="flex align-center gap-10 m-t-15"
                        to={currentRepository.forks_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GoRepoForked size={14} aria-hidden="true" />
                        {currentRepository.forks_count} forks
                    </Link>
                    <p className="flex align-center gap-10 m-t-15">
                        <GoEye size={14} aria-hidden="true" />
                        {currentRepository.watchers_count} watching</p>
                    <p className="flex align-center gap-10 m-t-15">
                        <GoIssueOpened size={14} aria-hidden="true" />
                        {currentRepository.open_issues} open issues
                    </p>
                </div>
            </section>
            <section className="section-seperator ">
                <h2 className="m-t-15">Contributors</h2>
                {renderContributors()}
            </section>
            <section className="section-seperator ">
                <h2 className="m-t-15">Languages</h2>
                {renderLanguages()}
            </section>                
        </main>
    );
}
