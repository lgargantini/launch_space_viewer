# React + TypeScript + Vite + Apollo Client

## ESlint

- ESlint React Plugin (`eslint-plugin-react`) - applied.
- ESlint Type Rules (`strictTypeChecked`) - applied.
  - **If you plan to change it, first make sure current flows are working as expected.**

## GraphQL Code Generator

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