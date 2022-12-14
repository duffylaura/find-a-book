const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
          if (context.user){
            const foundUser = await User.findOne({_id: context.user._id})
            return foundUser;
          }
            
        }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {throw new AuthenticationError('No email found!')}
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword){throw new AuthenticationError('Password not correct!')}
            
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            return {user};
        },

        saveBook: async (parent, { bookID }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookID }},
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('SAVE book error. Please log in to proceed.');
        },
          removeBook: async (parent, { id }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { id }}},
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('REMOVE book error. Please log in to proceed.');
        },

    }
}

module.exports = resolvers;