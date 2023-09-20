/* eslint-disable perfectionist/sort-objects */
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'src/client/lib/gql/schema.gql',
  documents: ['src/**/*.ts', 'src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    'src/client/lib/gql/': {
      preset: 'client',
    },
  },
}

export default config
