import { createContext, useContext, useEffect, useState } from "react";
import { request } from "../utils";

export const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
    const [repositoryList, setRepositoryList] = useState([]);
    const [isRepositoryLoading, setIsRepositoryLoading] = useState(false);

    useEffect(() => {
        fetchGithubRepositories();
    }, [])

    const fetchGithubRepositories = async () => {
        const baseUrl = `https://api.github.com/orgs/godaddy/repos`;
        const options = { method: "GET" };
        setIsRepositoryLoading(true)
        try {
            const repos = await request(baseUrl, options);
            setRepositoryList(repos);
        } catch (error) {
            console.log(error);
        } finally {
            setIsRepositoryLoading(false);
        }
    };

    const getCurrentRepository = (id) => {
        if (repositoryList?.length === 0) return {};
        return (repositoryList || []).find(repositoryDto => repositoryDto.id.toString() === id)
    };
    
    return (
        <RepoContext.Provider value={{ isRepositoryLoading, repositoryList, getCurrentRepository }}>
            {children}
        </RepoContext.Provider>
    );
  };
  
export const useRepoContext = () => useContext(RepoContext);
