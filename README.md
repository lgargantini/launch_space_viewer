# Launch Space App

This is a well-structured guide for running the Space App Proof of Concept (PoC). Here's a concise breakdown of the steps and commands:

## Installation and Setup
### Install Dependencies

Run the following command to install all necessary dependencies:
```bash
npm install
```

After dependency installation, explore the available scripts to understand the different operations you can perform during development, testing, and production.

### Available Scripts

#### Development
Start the Development Server
Run the following command to start the server in development mode:
```bash
npm run dev
```
#### Build
Build for Production
Use the following command to build the app for production:
```bash
npm run build
```
#### Testing (Unit Tests with Vitest)
Run the Test Suite

Run this command to execute all unit tests:
```
npm run test
```
##### Run Tests without Watch Mode

If you want to run tests without continuously watching for changes, use:
```
npm run test:no-watch
```
##### Run Tests with Coverage Report

To generate a coverage report after running tests, use:
```
npm run test:coverage
```
#### Linting (ESLint)
Lint the Codebase
Run this command to lint your code:
```
npm run lint
```
#### Preview
Preview Production Build
To preview the app as it would look in production, use:
```
npm run preview
```
#### Prepare
Set Up Husky for Git Hooks
This command sets up Husky for managing Git hooks:
```
npm run prepare
```
#### Pre-Commit Hook
Run Linting, Tests, and Coverage Before Committing.
 
This command ensures code quality by running linting, tests, and coverage checks before committing:
```
npm run pre-commit
```

#### Generate (Update Backend Schema)
Generate Code from GraphQL Schema.

This command updates your backend schema using Codegen:
```
npm run generate
```

Codegen - https://the-guild.dev/graphql/codegen

#### Additional Notes
Visit the docs folder for detailed configurations and project documentation.

### Considerations:

Since this app synchronizes backend structures with the frontend, discuss how often backend changes might occur and the impact on the current structure before proceeding.