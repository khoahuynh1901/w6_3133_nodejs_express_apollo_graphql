const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express"); // ✅ Fixed import

const typeDefs = require("./schema"); // ✅ Renamed for consistency
const resolvers = require("./resolvers");

require("dotenv").config(); // ✅ Direct dotenv import

// MongoDB Atlas Connection
const mongodb_atlas_url = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Success: Connected to MongoDB");
  } catch (error) {
    console.error(`❌ Error: Unable to connect to DB - ${error.message}`);
  }
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start(); // ✅ Ensure server starts before applying middleware

  const app = express();
  app.use(express.json());
  app.use(cors());

  server.applyMiddleware({ app }); // ✅ Fixed variable name

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    await connectDB(); // ✅ Connect to DB when the server starts
  });
}

startServer();
