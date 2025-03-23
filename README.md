# GitHub Repository Explorer
## Introduction
This project is a GitHub Repository Explorer that allows users to browse and view detailed information about repositories. 
The focus has been on performance, accessibility, testing, and code quality to ensure a seamless user experience.

## Getting Started
### Installation Steps:
git clone https://github.com/ShubamSinghDadhwal/GoDaddyGithub.git  
cd GoDaddyGithub  
npm install (using Node v18.15.0)

### Start the application (run in Terminal 1)
npm start  

### Run tests (execute in Terminal 2)
npm run test

## Key Decisions & Thought Process
### State Management with React Context
For managing global state, I chose React Context instead of an external library like Redux. Since the state requirements are not overly complex, 
Context keeps the solution lightweight and easy to maintain without unnecessary boilerplate.

### Virtualization Instead of Pagination (via "react-virtuoso")
#### Problem Statement
Initially, all data was rendered at once on the frontend. This caused performance issues:
- Laggy UI – Scrolling felt janky, especially on low-end devices.
- Inefficient Rendering – Large DOM size slowed down interactions.
- Backend Limitations – Pagination couldn't be implemented on the backend.

#### Why Virtualization?
To solve this, I used react-virtuoso, which:
- Improves Performance – Renders only visible items, reducing DOM size.
- Enhances UX – Smooth scrolling without re-fetching data (better percieved performance).
- Is Well-Maintained & have a bundle size of 17.9 kB (minified + gzipped size)
- Is Easy to Use – Minimal setup with built-in optimizations.
This approach significantly improved performance while keeping the implementation simple

## Routing with React Router
For navigation, I used React Router. It provides a clean and efficient way to handle routing, especially when dealing with dynamic repository details.
### Icons with React-Icons
To keep the UI simple and lightweight, I used "react-icons" for displaying GitHub-related icons like stars, forks, and watchers. 
This avoids importing heavy image assets while maintaining a clean UI.

## Accessibility Improvements
Making the application accessible was a key focus. Some improvements include:
- Proper ARIA attributes to ensure screen readers interpret elements correctly.
- Keyboard navigation support to allow users to navigate without a mouse.
- Screen reader-friendly content, such as adding aria-live attributes where necessary.
These small changes enhance usability for all users.

## Testing Strategy
Testing was done using Jest & React Testing Library, focusing on:
- Ensuring repository details render correctly.
- Checking that accessibility features work as expected.
- Validating that all interactive elements (buttons, links) function properly.
API calls were mocked to simulate different scenarios and ensure the UI behaves correctly under various conditions.

### Test Results:
Test Suites: 2 passed, 2 total  
Tests:       8 passed, 8 total

## Code Quality Best Practices
- Modular components: Kept components small and reusable to maintain clarity and ease of debugging.
- Custom hooks: Extracted repeated logic (such as fetching contributors) into custom hooks for better maintainability.
- Consistent formatting: Followed best practices for readability and performance.

## Final Thoughts
This project was built with performance, usability, and maintainability in mind. The decision to use virtualization over pagination was a key choice to optimize handling large datasets. At the same time, accessibility and testing were prioritized to ensure a smooth and inclusive experience for all users.

Looking forward to discussing further improvements and optimizations!
