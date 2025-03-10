import { User } from '../models/User';
import { signToken } from '../utils/auth.ts';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (context.user) {
        return await User.findById(context.user._id);
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
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_: any, { bookData }: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findByIdAndUpdate(
        context.user._id,
        { $push: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
    },

    removeBook: async (_: any, { bookId }: { bookId: string }, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    }
  }
};
