#GitHub Repository Explorer
##Introduction
This project is a GitHub Repository Explorer that allows users to browse and view detailed information about repositories. The focus has been on performance, accessibility, testing, and code quality to ensure a seamless user experience.

##Getting Started
#Installation
git clone https://github.com/ShubamSinghDadhwal/GoDaddyGithub.git
npm install
npm start
npm run test -> for starting tests

##Key Decisions & Thought Process
State Management with React Context
For managing global state, I chose React Context instead of an external library like Redux. Since the state requirements are not overly complex, Context keeps the solution lightweight and easy to maintain without unnecessary boilerplate.

##Virtualization Instead of Pagination
Handling large lists efficiently was a priority, so I opted for virtualization instead of traditional pagination.

###Why?
Performance boost: Only renders items currently visible on the screen, reducing the DOM size significantly.

Smooth scrolling: Unlike pagination, there’s no need for page reloads or additional data fetching on navigation.

###Trade-offs:
Memory consumption: Virtualization can use more memory compared to pagination.

Implementation complexity: Slightly more complex than pagination but worth it for performance gains.

###Routing with React Router
For navigation, I used React Router. It provides a clean and efficient way to handle routing, especially when dealing with dynamic repository details.

###Icons with React-Icons
To keep the UI simple and lightweight, I used React-Icons for displaying GitHub-related icons like stars, forks, and watchers. This avoids importing heavy image assets while maintaining a clean UI.

##Accessibility Improvements
Making the application accessible was a key focus. Some improvements include:

Proper ARIA attributes to ensure screen readers interpret elements correctly.

Keyboard navigation support to allow users to navigate without a mouse.

Screen reader-friendly content, such as adding aria-live attributes where necessary.

These small changes enhance usability for all users.

##Testing Strategy
Testing was done using Jest & React Testing Library, focusing on:

Ensuring repository details render correctly.

Checking that accessibility features work as expected.

Validating that all interactive elements (buttons, links) function properly.

API calls were mocked to simulate different scenarios and ensure the UI behaves correctly under various conditions.

##Code Quality Best Practices
Modular components: Kept components small and reusable to maintain clarity and ease of debugging.

Custom hooks: Extracted repeated logic (such as fetching contributors) into custom hooks for better maintainability.

Consistent formatting: Followed best practices for readability and performance.

##Final Thoughts
This project was built with performance, usability, and maintainability in mind. The decision to use virtualization over pagination was a key choice to optimize handling large datasets. At the same time, accessibility and testing were prioritized to ensure a smooth and inclusive experience for all users.

Looking forward to discussing further improvements and optimizations!
