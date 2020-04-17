/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList,
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
      type: UserBioType,
      async resolve(parent, args) {
        try {
          const contact = await CONTACT.findOne({ phone: parent.sender });
          return contact;
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
    receiver: {
      type: UserBioType,
      async resolve(parent, args) {
        try {
          const contact = await CONTACT.findOne({ phone: parent.receiver });
          return contact;
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
  }),
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
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
      type: new GraphQLList(SmsType),
      async resolve(parent, args) {
        try {
          const sentMessages = await SMS.find({ sender: parent.phone });
          const receivedMessages = await SMS.find({ receiver: parent.phone });
          return [
            ...sentMessages,
            ...receivedMessages,
          ];
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
  }),
});


const UserBioType = new GraphQLObjectType({
  name: 'UserBioType',
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
  }),
});

const DeleteSmsType = new GraphQLObjectType({
  name: 'DeleteSmsType',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    sender: {
      type: UserBioType,
    },
    receiver: {
      type: UserBioType,
    },
  }),
});


export {
  SmsType, UserType, UserBioType, DeleteSmsType,
};
