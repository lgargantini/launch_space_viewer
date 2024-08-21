import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
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