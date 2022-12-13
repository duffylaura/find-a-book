const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    Query: {
        users: async() => {
            return await User.find();
        }
    },
    Mutation: {
        login: async (parent, {username, password}) => {
            const user = await User.findOne({username});
            if (!user) {throw new AuthenticationError('No username found!')}
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword){throw new AuthenticationError('Password not correct!')}
            return {user};
        },

        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            return {user};
        },

        saveBook: async (parent, { saveThis }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: saveThis }},
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('Please log in to proceed.');
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
            throw new AuthenticationError('Please log in to proceed.');
        },

    }
}

module.exports = resolvers;