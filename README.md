# Front-end challenge - Carefull

## Objective

Develop a ReactJS application that utilizes Apollo Client to fetch and display a list of space launches from the provided GraphQL API.

## Task Details

- Framework: ReactJS with Vite.
- Data handling: Integrate Apollo Client for data fetching and use its caching capabilities.
- API Endpoint: https://apollo-fullstack-tutorial.herokuapp.com/graphql.
- Data to display: For each launch show the following fields: 
    - ID
    - mission name
    - rocket
    - name
    - launch site.
- User Interface: it can be a table or cards. It should be responsive and have infinite scrolling to load data as the user scrolls down.
- Testing: Write at least one test using the library of your choice. It should cache the GraphQL API response and verify the correct rendering of the data.
- Sharing: Use GitHub to share the project once it is finished. Use conventional commits.
- Extras: No additional features beyond those specified are required. However, feel free to include any other enhancements or optimizations that you believe would improve the overall quality of the project.

## Evaluation criteria

- Effectiveness: the screen and the test should work as expected.
- Code quality: the code should be reasonably clean, including meaningful variable names and component separation
- Efficiency: no unnecessary calls should be made to the API (rely on caching)
- User Experience: the scrolling mechanism should work seamlessly and the information should be displayed in a clear and organized way.

### IMPORTANT: the design is not under evaluation

- Process: the commits should be clear and have an adequate size (assume you are in a real project)