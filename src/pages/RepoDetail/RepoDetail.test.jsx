/*
    COVERAGE:
    Renders Loading Message when loading                                      DONE
    renders 'Repository not found' when not available                         DONE
    renders repository details when available                                 DONE
*/

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RepoContext } from "../../context/RepoContext";
import { GithubRepositoryDetail } from ".";

const renderWithRouterAndContext = (providerValue, repositoryId) => {
    return render(
      <MemoryRouter
        initialEntries={[`/repo/${repositoryId}`]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <RepoContext.Provider value={providerValue}>
          <Routes>
            <Route path="/repo/:repositoryId" element={<GithubRepositoryDetail />} />
          </Routes>
        </RepoContext.Provider>
      </MemoryRouter>
    );
  };

describe('Github Repository Detail', () => {
    test("renders loading message when repository is still loading", () => {
        const mockGetCurrentRepository = jest.fn().mockReturnValue({});
        renderWithRouterAndContext({
          isRepositoryLoading: true,
          repositoryList: [],
          getCurrentRepository: mockGetCurrentRepository,
        });
    
        expect(screen.getByText("Loading repository details...")).toBeInTheDocument();
    });

    test("renders 'Repository not found' when no repository is found", () => {
        const mockGetCurrentRepository = jest.fn().mockReturnValue({});
        renderWithRouterAndContext(
          {
            repositoryList: [],
            isRepositoryLoading: false,
            getCurrentRepository: mockGetCurrentRepository,
          },
          "123"
        );
        const notFoundText = screen.getByText(/repository not found/i);
        expect(notFoundText).toBeInTheDocument();
    });

    test("renders repository details when data is available", () => {
        const mockRepo = {
            id: "123",
            name: "Test Repository",
            description: "This is a test repository",
            html_url: "https://github.com/test/repo",
            license: { name: "MIT License", url: "https://opensource.org/licenses/MIT" },
            stargazers_url: "https://github.com/test/repo/stargazers",
            forks_url: "https://github.com/test/repo/forks",
            stargazers_count: 50,
            forks_count: 10,
            watchers_count: 25,
            open_issues: 5,
        };
        const mockGetCurrentRepository = jest.fn().mockReturnValue(mockRepo);
    
        renderWithRouterAndContext({
            isRepositoryLoading: false,
            repositoryList: [mockRepo],
            getCurrentRepository: mockGetCurrentRepository,
        });
        expect(screen.getByRole("link", { name: mockRepo.name })).toHaveAttribute("href", mockRepo.html_url);
        expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /MIT License/i })).toHaveAttribute("href", mockRepo.license.url);
        expect(screen.getByRole("link", { name: /50 stars/i })).toHaveAttribute("href", mockRepo.stargazers_url);
        expect(screen.getByRole("link", { name: /10 forks/i })).toHaveAttribute("href", mockRepo.forks_url);
        expect(screen.getByText(/25 watching/i)).toBeInTheDocument();
        expect(screen.getByText(/5 open issues/i)).toBeInTheDocument();
    });
})