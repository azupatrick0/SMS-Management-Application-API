import { GraphQLSchema } from 'graphql';
import RootMutation from '../mutations';
import RootQuery from '../queries';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
