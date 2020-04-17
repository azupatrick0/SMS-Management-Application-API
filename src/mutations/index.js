import {
  GraphQLObjectType, GraphQLString,
} from 'graphql';
import SMS from '../models/sms';
import CONTACT from '../models/contact';
import { SmsType, UserBioType, DeleteSmsType } from '../types';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createContact: {
      type: UserBioType,
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
      async resolve(parent, args) {
        try {
          await SMS.deleteMany({ sender: args.sender });
          await SMS.deleteMany({ receiver: args.receiver });
          return ({ data: { message: 'deleted' } });
        } catch (e) {
          return ({ data: { error: 'failed to delete' } });
        }
      },
    },
  },
});

export default RootMutation;
