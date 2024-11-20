import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient } from 'mongodb'

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

export async function POST(request: Request) {
  let client: MongoClient | null = null;
  
  try {
    const body = await request.json()
    const { name, email, message } = body

    console.log('Received contact form submission:', { name, email });

    // Validate the input
    if (!name || !email || !message) {
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

    // Connect to MongoDB
    client = await clientPromise
    const db = client.db('tm-landing-page')
    
    // Insert the contact form submission
    const result = await db.collection('contacts').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    })

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
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error,
      mongoClientConnected: !!client
    });

    return new NextResponse(
      JSON.stringify({
        error: 'Failed to submit contact form. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}
