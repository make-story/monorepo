// https://stackoverflow.com/questions/66511438/how-to-get-tsconfig-to-recognize-graphql-files-aliases-when-importing-them
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export = value;
}
