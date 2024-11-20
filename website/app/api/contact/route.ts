import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient, MongoServerError } from 'mongodb'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function withRetry<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation, ${retries} attempts remaining`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}

export async function POST(request: Request) {
  let client: MongoClient | null = null;
  
  try {
    // Log environment variables (excluding sensitive values)
    console.log('Environment check:', {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV,
    });

    const body = await request.json()
    const { name, email, message } = body

    console.log('Received contact form submission:', { 
      name, 
      email,
      messageLength: message?.length 
    });

    // Validate the input
    if (!name || !email || !message) {
      console.log('Validation failed:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasMessage: !!message 
      });

      return new NextResponse(
        JSON.stringify({
          error: 'Missing required fields',
          details: {
            name: !name ? 'Name is required' : null,
            email: !email ? 'Email is required' : null,
            message: !message ? 'Message is required' : null,
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    console.log('Attempting MongoDB connection...');

    // Connect to MongoDB with retry logic
    client = await withRetry(async () => {
      console.log('Connecting to MongoDB...');
      const client = await clientPromise;
      // Test the connection
      console.log('Testing MongoDB connection...');
      await client.db('admin').command({ ping: 1 });
      console.log('MongoDB connection successful');
      return client;
    });

    const db = client.db('tm-landing-page')
    
    console.log('Attempting to insert contact form submission...');

    // Insert the contact form submission with retry logic
    const result = await withRetry(async () => {
      return await db.collection('contacts').insertOne({
        name,
        email,
        message,
        createdAt: new Date(),
        metadata: {
          userAgent: request.headers.get('user-agent'),
          timestamp: new Date().toISOString()
        }
      });
    });

    console.log('Successfully saved contact form:', { id: result.insertedId });

    return new NextResponse(
      JSON.stringify({
        success: true,
        id: result.insertedId,
        message: 'Contact form submitted successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  } catch (error) {
    console.error('Detailed error in contact form submission:', {
      errorType: error?.constructor?.name,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      mongoClientConnected: !!client
    });

    // Handle specific MongoDB errors
    if (error instanceof MongoServerError) {
      console.error('MongoDB Server Error:', {
        code: error.code,
        codeName: error.codeName,
        message: error.message
      });
    }

    // Determine if it's a connection error
    const isConnectionError = error instanceof Error && 
      (error.message.includes('connect') || 
       error.message.includes('timeout') ||
       error.message.includes('network') ||
       error.message.includes('ssl') ||
       error.message.includes('tls'));

    // Log the error type we're returning
    console.log('Returning error response:', {
      isConnectionError,
      statusCode: isConnectionError ? 503 : 500,
      errorMessage: isConnectionError 
        ? 'Unable to connect to the database. Please try again later.'
        : 'Failed to submit contact form. Please try again later.'
    });

    return new NextResponse(
      JSON.stringify({
        error: isConnectionError 
          ? 'Unable to connect to the database. Please try again later.'
          : 'Failed to submit contact form. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: isConnectionError ? 503 : 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}
