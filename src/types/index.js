/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import {
  GraphQLObjectType, GraphQLString, GraphQLID,
} from 'graphql';
import CONTACT from '../models/contact';
import SMS from '../models/sms';

const SmsType = new GraphQLObjectType({
  name: 'SmsType',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    message: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    sender: {
      type: GraphQLString,
    },
    receiver: {
      type: GraphQLString,
    },
    smsReceiver: {
      type: ContactType,
      resolve(parent, args) {
        return CONTACT.find({ phone: parent.receiver });
      },
    },
  }),
});

const ContactType = new GraphQLObjectType({
  name: 'ContactType',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    messages: {
      type: SmsType,
      resolve(parent, args) {
        return SMS.find({ sender: parent.phone });
      },
    },
  }),
});

const DeleteSmsType = new GraphQLObjectType({
  name: 'DeleteSmsType',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    sender: {
      type: GraphQLString,
    },
    receiver: {
      type: GraphQLString,
    },
  }),
});


export { SmsType, ContactType, DeleteSmsType };
