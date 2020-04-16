/* eslint-disable no-unused-vars */
import {
  GraphQLObjectType, GraphQLList, GraphQLString,
} from 'graphql';
import SMS from '../models/sms';
import { SmsType, UserBioType, UserType } from '../types';
import CONTACT from '../models/contact';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllSms: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return SMS.find();
      },
    },
    getUser: {
      type: UserType,
      args: { phone: { type: GraphQLString } },
      async resolve(parent, args) {
        try {
          const user = await CONTACT.findOne({ phone: args.phone });
          return user;
        } catch (error) {
          return ({
            status: 'error',
            data: {
              error,
            },
          });
        }
      },
    },
    getUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return CONTACT.find();
      },
    },
  },
});

export default RootQuery;
