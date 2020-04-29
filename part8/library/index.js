require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
  PubSub
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const mongoUrl = process.env.MONGODB_URL;
const secret = process.env.SECRET;

console.log("connecting to DB...");
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecing to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.count({}),
    authorCount: () => Author.count({}),
    allBooks: (root, args) => {
      const { author, genre } = args;
      const query = {};
      console.log("requested");
      /*let matchedBooks = books;
      if (author) {
        matchedBooks = matchedBooks.filter(book => book.author === author);
      }*/

      if (genre) {
        query.genres = genre;
      }

      return Book.find(query).populate("author");
    },
    allAuthors: () => {
      return Author.find({});
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const bookAuthor = args.author;
      const authorExists = await Author.findOne({ name: bookAuthor });
      let newAuthor;

      if (!authorExists) {
        newAuthor = new Author({ name: bookAuthor, bookCount: 0 });
      }

      const author = authorExists || newAuthor;
      author.bookCount++;
      console.log(author.bookCount);
      await author.save();

      const book = new Book({ ...args, author: author.id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      book.author = author;

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const { name, setBornTo } = args;
      const author = await Author.findOne({ name });

      if (!author) return null;

      author.born = setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;
      const user = new User({ username, favoriteGenre });

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });

      if (!user || password !== "12345") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, secret) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), secret);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }

    return { currentUser: null };
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subsriptions ready at ${subscriptionsUrl}`);
});
