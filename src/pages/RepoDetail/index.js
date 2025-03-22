import React, { useEffect, useState } from 'react';
import { useRepoContext } from '../../context/RepoContext';
import { Link, useParams } from 'react-router-dom';
import { GoEye, GoIssueOpened, GoLaw, GoRepoForked, GoStar } from 'react-icons/go';
import { request } from '../../utils';
import { NoData } from '../../components/NoData';
import './style.css';

export const GithubRepositoryDetail = () => {
    const { repositoryId = '' } = useParams();
    const { getCurrentRepository } = useRepoContext();
    const currentRepository = getCurrentRepository(repositoryId) || {};
    
    const [repoContributorList, setRepoContributorList] = useState([]);
    const [repoLanguagesUrl, setRepoLanguagesUrl] = useState({})
    const [isLoading, setIsLoading] = useState({
        contributors: false,
        languages: false,
    })

    useEffect(() => {
        if (currentRepository?.languages_url) fetchRepoLanguages();
        if (currentRepository?.contributors_url) fetchRepoContributors();
    }, [currentRepository]);

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
        <Link className="flex align-center gap-10 m-r-5 m-b-10" to={contributorDto?.html_url}>
            <img className="contributor-image" width={20} height={20} src={contributorDto?.avatar_url} alt="contributor-image"/>
            <span>{contributorDto?.login}</span>
        </Link>
    );

    const renderLanguages = () => {
        if (isLoading.languages) return 'Loading...'
        if (Object.keys(repoLanguagesUrl).length === 0) return <NoData />
        return Object.keys(repoLanguagesUrl).map(language);
    };
    const language = (language) => <div className="m-t-10">{language}</div>

    return (
        <section className="repo-detail-container">
            <div>
                <Link className="heading" to={currentRepository.html_url}>{currentRepository.name}</Link>
            </div>
            <div className="section-seperator m-t-15">
                <h3 className="m-t-15">About</h3>
                <p>{currentRepository.description}</p>
                <div>
                    <Link className="flex align-center gap-10 m-t-15" to={currentRepository.license?.url}>
                        <GoLaw size={14} />
                        {currentRepository.license?.name}
                    </Link>
                    <Link className="flex align-center gap-10 m-t-15" to={currentRepository.stargazers_url}>
                        <GoStar size={14} />
                        {currentRepository.stargazers_count} stars
                    </Link>
                    <Link className="flex align-center gap-10 m-t-15" to={currentRepository.forks_url}>
                        <GoRepoForked size={14} />
                        {currentRepository.forks_count} forks
                    </Link>
                    <p className="flex align-center gap-10 m-t-15">
                        <GoEye size={14} />
                        {currentRepository.watchers_count} watching</p>
                    <p className="flex align-center gap-10 m-t-15">
                        <GoIssueOpened size={14}/>
                        {currentRepository.open_issues} open issues
                    </p>
                </div>
            </div>
            <div className="section-seperator ">
                <h3 className="m-t-15">Contributors</h3>
                {renderContributors()}
            </div>
            <div className="section-seperator ">
                <h3 className="m-t-15">Languages</h3>
                {renderLanguages()}
            </div>                
        </section>
    );
}
