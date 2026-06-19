import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3001/graphql',
  documents: ['src/infrastructure/graphql/operations/*.graphql'],
  generates: {
    'src/infrastructure/graphql/__generated__/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
