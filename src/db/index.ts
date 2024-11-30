import mongoose from "mongoose";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(uri: string, dbName: string): Promise<typeof mongoose> {
    if (!uri) {
      throw new Error("MongoDB URI is required");
    }

    if (!dbName) {
      throw new Error("Database name is required");
    }

    if (this.connection) {
      return this.connection;
    }

    try {
      const connectionOptions: mongoose.ConnectOptions = {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        autoIndex: process.env.NODE_ENV !== "production",
      };

      this.connection = await mongoose.connect(uri, connectionOptions);

      console.log(`Successfully connected to database: ${dbName}`);

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("Lost MongoDB connection");
      });

      return this.connection;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);

      if (error instanceof Error) {
        throw new Error(`Database Connection Failed: ${error.message}`);
      }

      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log("Mongoose connection closed");
    }
  }
}

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!MONGODB_DB) {
    throw new Error("Please define the MONGODB_DB environment variable");
  }

  const dbConnection = DatabaseConnection.getInstance();
  return dbConnection.connect(MONGODB_URI, MONGODB_DB);
}

export default connectToDatabase;
