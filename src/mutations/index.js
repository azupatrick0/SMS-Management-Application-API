import {
  GraphQLObjectType, GraphQLString,
} from 'graphql';
import SMS from '../models/sms';
import CONTACT from '../models/contact';
import { SmsType, ContactType, DeleteSmsType } from '../types';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createContact: {
      type: ContactType,
      args: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        const addContact = new CONTACT({
          name: args.name,
          phone: args.phone,
        });
        return addContact.save();
      },
    },
    createSms: {
      type: SmsType,
      args: {
        message: { type: GraphQLString },
        status: { type: GraphQLString },
        sender: { type: GraphQLString },
        receiver: { type: GraphQLString },
      },
      resolve(parent, args) {
        const addSms = new SMS({
          message: args.message,
          status: 'sent',
          sender: args.sender,
          receiver: args.receiver,
        });
        return addSms.save();
      },
    },
    deleteSms: {
      type: DeleteSmsType,
      args: { sender: { type: GraphQLString }, receiver: { type: GraphQLString } },
      resolve(parent, args) {
        return SMS.deleteOne({ sender: args.sender });
      },
    },
  },
});

export default RootMutation;
