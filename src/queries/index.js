/* eslint-disable no-unused-vars */
import {
  GraphQLObjectType, GraphQLList, GraphQLString,
} from 'graphql';
import SMS from '../models/sms';
import { SmsType, ContactType } from '../types';
import CONTACT from '../models/contact';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllSms: {
      type: new GraphQLList(SmsType),
      resolve(parent, args) {
        return SMS.find();
      },
    },
    getAllSmsSentByAUser: {
      type: new GraphQLList(SmsType),
      args: { sender: { type: GraphQLString } },
      resolve(parent, args) {
        return SMS.find({ sender: args.sender });
      },
    },
    getAllSmsReceivedByAUser: {
      type: new GraphQLList(SmsType),
      args: { receiver: { type: GraphQLString } },
      resolve(parent, args) {
        return SMS.find({ receiver: args.receiver });
      },
    },
    getUser: {
      type: new GraphQLList(ContactType),
      args: { phone: { type: GraphQLString } },
      resolve(parent, args) {
        return CONTACT.find({ phone: args.phone });
      },
    },
  },
});

export default RootQuery;
