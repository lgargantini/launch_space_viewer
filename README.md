# Launch Space App

This app is intended as PoC running several technologies simultaneously, display most updated backend structures, keeping both synchronized, and force adjustments whenever a change ocurrs on both sides. 

This approach to render information give us a good way of vigilance on critical information, that will, at some point, be displayed to regular users. It has some downsides, that needs to be considered and discussed, before taking action. Consider how often information on the backend changes, and how those changes will impact your current structure.


## How to run it?

Example using NPM (review `man npm` for more information)

### Install dependencies
```
npm install
```

After installing dependencies, you might consider checking Available Script Section. 

### Available Scripts

#### Development

- `dev`: Starts the development server.

#### Build

- `build`: Builds the app for production.

#### Testing ( Unit Tests - Vitest - https://vitest.dev/)
- `test`: Runs the test suite.

##### Variation No Watch

- `test:no-watch`: Runs the test suite without watch mode.

##### Variation Coverage

- `test:coverage`: Runs tests and generates a coverage report.

#### Linter ( ESlint - https://eslint.org/ )

- `lint`: Lints the codebase.

#### Preview ( Production )

- `preview`: Previews the production build.

#### Prepare

- `prepare`: Sets up Husky for Git hooks.

#### Pre Commit

- `pre-commit`: Runs linting, tests, and coverage before committing.

#### Generate - Note: this will update your backend schema ( Codegen - https://the-guild.dev/graphql/codegen, visit for more information )

- `generate`: Generates code from GraphQL schema.

Please make sure `src/codegen.ts` exists, I'll share an example of how looks:

```
const config: CodegenConfig = {
    schema: 'YOUR_URL_SERVICE',
    documents: ['src/**/*.tsx'],
    generates: {
        './src/graphql/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: "gql",
            }
        },
        './schema.graphql': {
            plugins: ['schema-ast'],
            config: {
                includeDirectives: true
            }
        }
    },
    ignoreNoDocuments: true
}

export default config
```

As you can see on the  `generates` config section, it will attempt to create different outputs files:
 - Schema GraphQL (file: `'./schema.graphql'`): Observe this file to be aware of how your backend structure is created. Create validations to tests each Object generated, discuss how important is for your application.
 - GraphQL folder (folder: `'./src/graphql/'`): Consider taking a look on each file, as it might help you later, mainly when you attempt to use the generated information from `React.JS` pages.

 
