import User from '../models/User.js';
import { signToken } from '../types/express/services/auth.js';


export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (context.username) {
        return await User.findById(context._id);
      }
      throw new Error('Not authenticated');
    }
  },

  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user.id, user.email, user.username);
      console.log(token);
      return { token, user };
    },

    addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.id, user.email, user.username);
      return { token, user };
    },

    saveBook: async (_: any, { bookData }: any, context: any) => {
      console.log(context);
      if (!context.username) throw new Error('Not authenticated');
      return await User.findByIdAndUpdate(
        context._id,
        { $push: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
    },

    removeBook: async (_: any, { bookId }: { bookId: string }, context: any) => {
      if (!context.username) throw new Error('Not authenticated');
      return await User.findByIdAndUpdate(
        context._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    }
  }
};
