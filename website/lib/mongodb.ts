import { MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  retryWrites: true,
  retryReads: true,
  tls: true,
  tlsInsecure: false,
  directConnection: false,
  w: 'majority'
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

async function connectToDatabase(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }

  try {
    if (client) {
      // Check if the existing client is connected
      await client.db('admin').command({ ping: 1 })
      console.log('Reusing existing MongoDB connection')
      return client
    }
  } catch (e) {
    // If ping fails, create a new client
    console.error('MongoDB connection error:', e)
    if (client) {
      try {
        await client.close()
      } catch (closeError) {
        console.error('Error closing MongoDB client:', closeError)
      }
    }
  }

  try {
    console.log('Initializing new MongoDB connection...')
    client = new MongoClient(uri, options)
    await client.connect()
    console.log('Testing MongoDB connection...')
    await client.db('admin').command({ ping: 1 })
    console.log('MongoDB connected successfully')
    return client
  } catch (e) {
    console.error('MongoDB connection error:', {
      error: e instanceof Error ? {
        name: e.name,
        message: e.message,
        stack: e.stack
      } : e
    })
    throw e
  }
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectToDatabase()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = connectToDatabase()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
