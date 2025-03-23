/*
    COVERAGE:
    Renders component heading                                       DONE
    Shows "Loading..." when fetching                                DONE
    Shows "No Data" if empty                                        DONE
    Displays repositories & details correctly                       DONE
    Filters repositories on search                                  DONE
*/

import { render, screen } from "@testing-library/react"
import GithubRepositoryListing from "."
import { RepoContext } from "../../context/RepoContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock('react-virtuoso', () => ({
  Virtuoso: ({ data, itemContent }) => (
    <ul data-testid="virtuoso-mock">
      {data.map((item, index) => (
        <div key={index}>{itemContent(index, item)}</div>
      ))}
    </ul>
  ),
}));

const renderWithContext = (component, { providerValue, route = '/' }) => {
  return render(
    <MemoryRouter 
      initialEntries={[route]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <RepoContext.Provider value={providerValue}>
        {component}
      </RepoContext.Provider>
    </MemoryRouter>
  );
};

describe('Github Repository Listing', () => {
    test('renders component heading', () => {
        renderWithContext(<GithubRepositoryListing />, { providerValue: { isRepositoryLoading: false, repositoryList: [] } })
        const headingElement = screen.getByRole('heading', { name: /repositories/i });
        expect(headingElement).toBeInTheDocument();
    })

    test('shows loading state when fetching repositories', () => {
        renderWithContext(<GithubRepositoryListing />, { providerValue: { isRepositoryLoading: true, repositoryList: [] } })
        const loadingElement = screen.getByText(/loading/i);
        expect(loadingElement).toBeInTheDocument();
    })

    test('shows "No Data" message when repository list is empty', () => {
        renderWithContext(<GithubRepositoryListing />, { providerValue: { isRepositoryLoading: false, repositoryList: [] } });
        const noDateElement = screen.getByText(/no data/i);
        expect(noDateElement).toBeInTheDocument();
    })

    test('displays repository list with details', async () => {
        const mockRepositories = [
          {
            id: 1,
            name: 'Repo 1',
            visibility: 'public',
            description: 'Test repo 1',
            language: 'JavaScript',
            stargazers_count: 10,
            forks_count: 5,
            open_issues_count: 3,
            watchers_count: 20,
            updated_at: '2024-03-20T12:00:00Z',
          },
        ];
        renderWithContext(<GithubRepositoryListing />, {
          providerValue: { isRepositoryLoading: false, repositoryList: mockRepositories },
        });
    
        const repoLink = await screen.findByRole('link', { name: /repo 1/i });
        expect(repoLink).toBeInTheDocument();
      
        const publicText = await screen.findByText('public');
        expect(publicText).toBeInTheDocument();
      
        const description = await screen.findByText('Test repo 1');
        expect(description).toBeInTheDocument();
      
        const languageText = await screen.findByText('JavaScript');
        expect(languageText).toBeInTheDocument();
      
        const stars = await screen.findByText('10');
        expect(stars).toBeInTheDocument();
      
        const forks = await screen.findByText('5');
        expect(forks).toBeInTheDocument();
      
        const openIssues = await screen.findByText('3');
        expect(openIssues).toBeInTheDocument();
      
        const watchers = await screen.findByText('20');
        expect(watchers).toBeInTheDocument();
      
        const updatedOn = await screen.findByText(/updated on/i);
        expect(updatedOn).toBeInTheDocument();
      });

      test('filters repositories based on search input', async () => {
        const mockRepositories = [
            { id: 1, name: 'React Repo', visibility: 'public', description: 'React project' },
            { id: 2, name: 'Vue Repo', visibility: 'private', description: 'Vue project' },
        ];

        renderWithContext(<GithubRepositoryListing />, {
            providerValue: { isRepositoryLoading: false, repositoryList: mockRepositories }
        });

        const searchInput = screen.getByPlaceholderText(/find a repository/i);
        await userEvent.type(searchInput, 'React');

        expect(screen.getByRole('link', { name: /react repo/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /vue repo/i })).not.toBeInTheDocument();
    });
})